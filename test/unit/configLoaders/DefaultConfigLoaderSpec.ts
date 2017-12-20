import DefaultConfigLoader from '../../../src/configLoaders/DefaultConfigLoader';
import * as sinon from 'sinon';
import { assert } from 'chai';
import * as path from 'path';
import * as fs from 'fs';

describe('DefaultConfigLoader', () => {
  let defaultConfigLoader: DefaultConfigLoader;
  let projectRoot: string = '/path/to/project/root';
  let fsStub: FsStub = {};
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    fsStub.readFileSync = sandbox.stub(fs, 'readFileSync').returns('{}');

    defaultConfigLoader = new DefaultConfigLoader(projectRoot, fs);
  });

  afterEach(() => sandbox.restore());

  it('should load the jest configuration from the package.json in the project', () => {
    defaultConfigLoader.loadConfig();

    assert(fsStub.readFileSync.calledWith(path.join(projectRoot, 'package.json'), 'utf8'), 'readFileSync not called');
  });
});

interface FsStub {
  [key: string]: sinon.SinonStub;
}