import ConfigLoader from './ConfigLoader';
import * as path from 'path';
import JestConfiguration from './JestConfiguration';

/**
 * The Default config loader will load the Jest configuration using the package.json in the package root
 */
export default class DefaultConfigEditor implements ConfigLoader {
  private _fs: any;
  private _projectRoot: string;

  constructor(projectRoot: string, fs: any) {
    this._projectRoot = projectRoot;
    this._fs = fs;
  }

  public loadConfig(): JestConfiguration {
    const packageJsonPath = path.join(this._projectRoot, 'package.json');

    return JSON.parse(this._fs.readFileSync(packageJsonPath, 'utf8')).jest;
  }
}