import { Config, ConfigEditor } from 'stryker-api/config';
import DefaultConfigLoader from './configLoaders/DefaultConfigLoader';
import ConfigLoader from './configLoaders/ConfigLoader';
import * as fs from 'fs';
import ReactConfigLoader from './configLoaders/ReactConfigLoader';

export default class JestConfigEditor implements ConfigEditor {
  public edit(config: Config): void {
    let project = 'default';

    if (config.jest && config.jest.project) {
      project = config.jest.project;
    }

    config.jest = config.jest || {};
    config.jest.config = this.getConfigLoader(project).loadConfig();
  }

  private getConfigLoader(project: string): ConfigLoader {
    let configLoader: ConfigLoader;

    switch (project.toLowerCase()) {
      case 'default':
        configLoader = new DefaultConfigLoader(process.cwd(), fs);
      break;
      case 'react':
        configLoader = new ReactConfigLoader(process.cwd());
      break;
      default:
        throw new Error(`No configLoader available for ${project}`);
    }

    return configLoader;
  }
}