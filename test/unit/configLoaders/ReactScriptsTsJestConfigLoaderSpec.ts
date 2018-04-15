import * as path from 'path';
import * as sinon from 'sinon';
import { assert, expect } from 'chai';
import ReactScriptsTsJestConfigLoader from '../../../src/configLoaders/ReactScriptsTsJestConfigLoader';
import * as helper from '../../../src/utils/createReactJestConfig';

const fakeRequire: any = {
  resolve: () => { }
};

describe('ReactScriptsTsJestConfigLoader', () => {
  let reactConfigLoader: ReactScriptsTsJestConfigLoader;
  let sandbox: sinon.SinonSandbox;
  let requireResolveStub: sinon.SinonStub;
  let createReactJestConfigStub: sinon.SinonStub;

  let projectRoot = '/path/to/project';
  let reactScriptsTsPackagePath = './node_modules/react-scripts-ts/package.json';

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    createReactJestConfigStub = sandbox.stub(helper, 'createReactTsJestConfig');
    createReactJestConfigStub.callsFake((resolve: any, projectRoot: string, eject: boolean) => ({
      relativePath: resolve('test'),
      projectRoot,
      eject
    }));

    requireResolveStub = sandbox.stub(fakeRequire, 'resolve');
    requireResolveStub.returns(reactScriptsTsPackagePath);

    reactConfigLoader = new ReactScriptsTsJestConfigLoader(projectRoot, fakeRequire);
  });

  afterEach(() => sandbox.restore());

  it('should load the configuration via the createJestConfig method provided by react-scripts-ts', () => {
    reactConfigLoader.loadConfig();

    assert(requireResolveStub.calledWith('react-scripts-ts/package.json'));
  });

  it('should generate a configuration', () => {
    const config = reactConfigLoader.loadConfig();

    expect(config).to.deep.equal({
      relativePath: path.join('node_modules', 'react-scripts-ts', 'test'),
      projectRoot: '/path/to/project',
      eject: false,
      testEnvironment: 'jsdom'
    });
  });
});