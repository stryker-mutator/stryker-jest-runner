import ConfigLoader from './ConfigLoader';
import createReactJestConfig from '../utils/createReactJestConfig';
import * as path from 'path';

export default class ReactConfigLoader implements ConfigLoader {
  private loader: NodeRequire;
  private projectRoot: string;

  public constructor(projectRoot: string, loader?: NodeRequire) {
    this.loader = loader || /* istanbul ignore next */ require;
    this.projectRoot = projectRoot;
  }

  public loadConfig(): string {
    const reactScriptsLocation = path.join(this.loader.resolve('react-scripts/package.json'), '..');

    const jestConfiguration = this.createJestConfig(reactScriptsLocation);
    
    jestConfiguration.testEnvironment = 'jsdom';

    return JSON.stringify(jestConfiguration);
  }

  private createJestConfig(reactScriptsLocation: string): any {
    return createReactJestConfig(
      (relativePath: string): string => path.join(reactScriptsLocation, relativePath),
      this.projectRoot,
      false
    );
  }
}