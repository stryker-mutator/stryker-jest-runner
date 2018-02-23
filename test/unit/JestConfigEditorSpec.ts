import { Config } from 'stryker-api/config';
import * as sinon from 'sinon';
import { assert, expect } from 'chai';
import JestConfigEditor from '../../src/JestConfigEditor';
import DefaultJestConfigLoader, * as defaultJestConfigLoader from '../../src/configLoaders/DefaultJestConfigLoader';
import ReactScriptsJestConfigLoader, * as reactScriptsJestConfigLoader from '../../src/configLoaders/ReactScriptsJestConfigLoader';

describe('JestConfigEditor', () => {
  let jestConfigEditor: JestConfigEditor;
  let sandbox: sinon.SinonSandbox;

  let defaultConfigLoaderStub: ConfigLoaderStub;
  let reactConfigLoaderStub: ConfigLoaderStub;
  let config: Config;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    defaultConfigLoaderStub = sinon.createStubInstance(DefaultJestConfigLoader);
    reactConfigLoaderStub = sinon.createStubInstance(ReactScriptsJestConfigLoader);

    sandbox.stub(defaultJestConfigLoader, 'default').returns(defaultConfigLoaderStub);
    sandbox.stub(reactScriptsJestConfigLoader, 'default').returns(reactConfigLoaderStub);

    jestConfigEditor = new JestConfigEditor();
    config = new Config();
  });

  afterEach(() => sandbox.restore());

  it('should call the defaultConfigLoader loadConfig method when no project is defined', () => {
    jestConfigEditor.edit(config);

    expect(config.jest.project).to.equal('default');
    assert(defaultConfigLoaderStub.loadConfig.calledOnce, 'DefaultConfigLoader loadConfig not called');
  });

  it('should call the reactConfigLoader loadConfig method when no project is defined', () => {
    config.set({ jest: { project: 'react' } });

    jestConfigEditor.edit(config);

    assert(reactConfigLoaderStub.loadConfig.calledOnce, 'ReactConfigLoader loadConfig not called');
  });

  it('should override verbose, collectcoverage and bail on all loaded configs', () => {
    defaultConfigLoaderStub.loadConfig.returns({ collectCoverage : true, verbose: true, bail: false });

    jestConfigEditor.edit(config);

    expect(config.jest.config).to.deep.equal({ 
      collectCoverage: false,
      verbose: false,
      bail: true
    });
  });

  it('should return an error when an invalid project is defined', () => {
    const project = 'invalidProject';
    config.set({ jest: { project } });

    expect(() => jestConfigEditor.edit(config)).to.throw(Error, `No configLoader available for ${project}`);
  });
});

interface ConfigLoaderStub {
  loadConfig: sinon.SinonStub;
}