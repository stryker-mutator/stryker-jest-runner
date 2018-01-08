import DefaultConfigLoader, * as defaultConfigLoader from '../../src/configLoaders/DefaultConfigLoader';
import JestConfigEditor from '../../src/JestConfigEditor';
import { Config } from 'stryker-api/config';
import * as sinon from 'sinon';
import { assert, expect } from 'chai';
import ReactConfigLoader, * as reactConfigLoader from '../../src/configLoaders/ReactConfigLoader';

describe('JestConfigEditor', () => {
  let jestConfigEditor: JestConfigEditor;
  let sandbox: sinon.SinonSandbox;

  let defaultConfigLoaderStub: ConfigLoaderStub;
  let reactConfigLoaderStub: ConfigLoaderStub;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    defaultConfigLoaderStub = sinon.createStubInstance(DefaultConfigLoader);
    reactConfigLoaderStub = sinon.createStubInstance(ReactConfigLoader);
    
    sandbox.stub(defaultConfigLoader, 'default').returns(defaultConfigLoaderStub);
    sandbox.stub(reactConfigLoader, 'default').returns(reactConfigLoaderStub);

    jestConfigEditor = new JestConfigEditor;
  });

  afterEach(() => sandbox.restore());

  it('should call the defaultConfigLoader edit method when no project is defined', () => {
    const config = new Config;

    jestConfigEditor.edit(config);

    assert(defaultConfigLoaderStub.loadConfig.calledOnce, 'DefaultConfigLoader loadConfig not called');
  });

  it('should call the reactConfigLoader edit method when no project is defined', () => {
    const config = new Config;
    config.set({ jest: { project: 'react' }});

    jestConfigEditor.edit(config);

    assert(reactConfigLoaderStub.loadConfig.calledOnce, 'ReactConfigLoader loadConfig not called');
  });

  it('should return an error when an invalid project is defined', () => {
    const config = new Config;
    const project = 'invalidProject';
    config.set({ jest: { project } });

    expect(() => jestConfigEditor.edit(config)).to.throw(Error, `No configLoader available for ${ project }`);
  });
});

interface ConfigLoaderStub {
  loadConfig: sinon.SinonStub;
}