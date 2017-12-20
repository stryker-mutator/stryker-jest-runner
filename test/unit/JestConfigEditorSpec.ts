import DefaultConfigLoader, * as defaultConfigLoader from '../../src/configLoaders/DefaultConfigLoader';
import JestConfigEditor from '../../src/JestConfigEditor';
import { Config } from 'stryker-api/config';
import * as sinon from 'sinon';
import { assert, expect } from 'chai';

describe('JestConfigEditor', () => {
  let jestConfigEditor: JestConfigEditor;
  let sandbox: sinon.SinonSandbox;

  let defaultConfigLoaderStub: ConfigLoaderStub;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    defaultConfigLoaderStub = sinon.createStubInstance(DefaultConfigLoader);
    sandbox.stub(defaultConfigLoader, 'default').returns(defaultConfigLoaderStub);

    jestConfigEditor = new JestConfigEditor;
  });

  afterEach(() => sandbox.restore());

  it('should call the defaultConfigLoader edit method when no project is defined', () => {
    const config = new Config;

    jestConfigEditor.edit(config);

    assert(defaultConfigLoaderStub.loadConfig.calledOnce, 'DefaultConfigLoader loadConfig not called');
  });

  it('should return an error when an invalid project is defined', () => {
    const config = new Config;
    const project = 'invalidProject';
    config.set({ jest: { project } });

    expect(() => jestConfigEditor.edit(config)).to.throw(Error, `No configLoader available for ${ project }`)
  });
});

interface ConfigLoaderStub {
  loadConfig: sinon.SinonStub;
}