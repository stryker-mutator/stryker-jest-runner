import Configloader from './ConfigLoader';
import * as path from 'path';

export default class DefaultConfigEditor implements Configloader {
  private fs: any;
  private projectRoot: string;

  constructor(projectRoot: string, fs: any) {
    this.projectRoot = projectRoot;
    this.fs = fs;
  }

  public loadConfig(): string {
    return JSON.stringify(this.getJestConfigFromPackageJson(this.projectRoot));
  }

  private getJestConfigFromPackageJson(projectRoot: string) {
    return JSON.parse(this.fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8')).jest;
  }
}