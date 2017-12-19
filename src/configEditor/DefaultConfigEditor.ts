import { Config, ConfigEditor } from 'stryker-api/config';
import * as path from 'path';

export default class DefaultConfigEditor implements ConfigEditor {
  private fs: any;
  private projectRoot: string;

  constructor(projectRoot: string, fs: any) {
    this.projectRoot = projectRoot;
    this.fs = fs;
  }

  public edit(config: Config) {
    try {
      config.jestConfig = this.getJestConfigFromPackageJson(this.getConfigLocation(this.projectRoot, config));
    } catch {

    }    
  }

  private getConfigLocation(projectRoot: string, config: Config) {    
    if(config.jest && config.jest.packageJsonLocation) {
      return path.join(projectRoot, config.jest.packageJsonLocation);
    } else {
      return path.join(projectRoot, 'package.json');
    }
  }

  private getJestConfigFromPackageJson(packageJsonPath: string) {
    return JSON.parse(this.fs.readFileSync(packageJsonPath, 'utf8')).jest;
  }
}