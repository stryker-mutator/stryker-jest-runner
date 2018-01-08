import ReactConfigLoader from '../../../src/configLoaders/ReactConfigLoader';
import * as createReactJestConfig from '../../../src/utils/createReactJestConfig';
import * as sinon from 'sinon';
import { assert, expect } from 'chai';

const fakeRequire: any = {
  resolve: () => {}
};

describe('ReactConfigLoader', () => {
  let reactConfigLoader: ReactConfigLoader;
  let sandbox: sinon.SinonSandbox;
  let requireResolveStub: sinon.SinonStub;
  let createReactJestConfigStub: sinon.SinonStub;

  let projectRoot = '/path/to/project';
  let reactScriptsPackagePath = './node_modules/react-scripts/package.json';

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    createReactJestConfigStub = sandbox.stub(createReactJestConfig, 'default');
    createReactJestConfigStub.callsFake((resolve: any, projectRoot: string, eject: boolean) => ({
      relativePath: resolve('test'),
      projectRoot,
      eject
    }));

    requireResolveStub = sandbox.stub(fakeRequire, 'resolve');
    requireResolveStub.returns(reactScriptsPackagePath);

    reactConfigLoader = new ReactConfigLoader(projectRoot, fakeRequire);
  });

  afterEach(() => sandbox.restore());

  it('should load the configuration via the createJestConfig method provided by react-scripts', () => {
    reactConfigLoader.loadConfig();

    assert(requireResolveStub.calledWith('react-scripts/package.json'));
  });

  it('should generate a configuration', () => {
    const config = JSON.parse(reactConfigLoader.loadConfig());
    
    expect(config).to.deep.equal({ relativePath: 'node_modules/react-scripts/test', projectRoot: '/path/to/project', eject: false, testEnvironment: 'jsdom' });
  });
});