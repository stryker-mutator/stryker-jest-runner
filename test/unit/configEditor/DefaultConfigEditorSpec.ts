import DefaultConfigEditor from '../../../src/configEditor/DefaultConfigEditor';
import * as sinon from 'sinon';
import { assert } from 'chai';
import { Config } from 'stryker-api/config';
import * as path from 'path';

const fakeFs: any = {
  readFileSync: sinon.spy()
}

describe('DefaultConfigEditor', () => {
  let defaultConfigEditor: DefaultConfigEditor;
  let projectRoot: string = '/path/to/project/root';

  beforeEach(() => {
    defaultConfigEditor = new DefaultConfigEditor(projectRoot, fakeFs);
  });

  it('should call the project package.json in the projectRoot wen no location is provided', () => {
    defaultConfigEditor.edit(new Config);

    assert(fakeFs.readFileSync.calledWith(path.join(projectRoot, 'package.json'), 'utf8'));
  });

  it('should load the package.json from the relative path from the projectRoot provided by the user', () => {
    const relativePath = './config/package.json';
    const config = new Config;
    config.set({ jest: { packageJsonLocation: relativePath } });
    
    defaultConfigEditor.edit(config);

    assert(fakeFs.readFileSync.calledWith(path.join(projectRoot, relativePath), 'utf8'));
  });
});