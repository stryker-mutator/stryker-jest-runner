import JestTestAdapter from './JestTestAdapter';
import { getLogger } from 'log4js';
import { Configuration, runCLI } from 'jest';

export default class JestPromiseTestAdapter implements JestTestAdapter {
  private log = getLogger(JestPromiseTestAdapter.name);

  public run(jestConfig: Configuration, projectRoot: string): Promise<any> {
    jestConfig.reporters = [];
    const config = JSON.stringify(jestConfig);
    this.log.trace(`Invoking Jest with config ${config}`);

    return runCLI({
      config: config,
      runInBand: true,
      silent: true
    }, [projectRoot]);
  }
}