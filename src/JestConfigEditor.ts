import { Config, ConfigEditor } from 'stryker-api/config';
import ReactConfigEditor from './configEditor/ReactConfigEditor';
import DefaultConfigEditor from './configEditor/DefaultConfigEditor';
import * as fs from 'fs';

export default class JestConfigEditor implements ConfigEditor {
  public edit(config: Config): void {
    let project = 'default';

    if (config.jest && config.jest.project) {
      project = config.jest.project;
    }

    this.getConfigEditor(project).edit(config);
  }

  private getConfigEditor(project: string): ConfigEditor {
    let configEditor: ConfigEditor;

    switch (project.toLowerCase()) {
      case 'react':
        configEditor = new ReactConfigEditor;
      break;
      default:
        configEditor = new DefaultConfigEditor(process.cwd(), fs);
      break;
    }

    return configEditor;
  }
}