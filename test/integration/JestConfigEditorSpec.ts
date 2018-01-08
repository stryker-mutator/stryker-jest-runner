import JestConfigEditor from '../../src/JestConfigEditor';
import { Config } from 'stryker-api/config';
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as path from 'path';

describe('Integration JestConfigEditor', () => {
  let jestConfigEditor: JestConfigEditor;
  let sandbox: sinon.SinonSandbox;
  let getProjectRootStub: sinon.SinonStub;

  let projectRoot: string = process.cwd();
  let config: Config;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    getProjectRootStub = sandbox.stub(process, 'cwd');
    getProjectRootStub.returns(projectRoot);

    jestConfigEditor = new JestConfigEditor();

    config = new Config;
  });

  afterEach(() => sandbox.restore());

  it('should create a jest configuration for a react project', () => {
    config.set({ jest: { project: 'react' } });

    jestConfigEditor.edit(config);

    const expectedResult = {
      collectCoverageFrom: [
        'src/**/*.{js,jsx,mjs}'
      ],
      setupFiles: [path.join(projectRoot, 'node_modules', 'react-scripts', 'config', 'polyfills.js')],
      testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}',
        '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs}'
      ],
      testEnvironment: 'jsdom',
      testURL: 'http://localhost',
      transform: {
        '^.+\\.(js|jsx|mjs)$': path.join(projectRoot, 'node_modules', 'react-scripts', 'config', 'jest', 'babelTransform.js'),
        '^.+\\\.css$': path.join(projectRoot, 'node_modules', 'react-scripts', 'config', 'jest', 'cssTransform.js'),
        '^(?!.*\\.(js|jsx|mjs|css|json)$)': path.join(projectRoot, 'node_modules', 'react-scripts', 'config', 'jest', 'fileTransform.js')
      },
      transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'
      ],
      moduleNameMapper: {
        '^react-native$': 'react-native-web'
      },
      moduleFileExtensions: [
        'web.js',
        'mjs',
        'js',
        'json',
        'web.jsx',
        'jsx',
        'node'
      ],
      rootDir: projectRoot
    };

    // Parse the json back to an object in order to match
    expect(JSON.parse(config.jest.config)).to.deep.equal(expectedResult);
  });

  it('should load the jest configuration from the package.json', () => {
    getProjectRootStub.returns(path.join(process.cwd(), 'testResources', 'exampleProject'));

    jestConfigEditor.edit(config);

    expect(JSON.parse(config.jest.config)).to.deep.equal({
      rootDir: '/path/to/testResource/exampleProject',
      exampleProperty: 'exampleValue'
    });
  });

  it('should return with an error when an invalid project is specified', () => {
    const project = 'invalidProject';
    config.set({ jest: { project } });

    expect(() => jestConfigEditor.edit(config)).to.throw(Error, `No configLoader available for ${project}`);
  });
});