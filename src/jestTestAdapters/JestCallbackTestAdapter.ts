import { getLogger } from 'log4js';

import JestTestAdapter from './JestTestAdapter';

export default class JestCallbackTestAdapter implements JestTestAdapter {
  private log = getLogger(JestCallbackTestAdapter.name);
  private testRunner: any;

  public constructor(loader?: NodeRequire) {
    loader = loader || /* istanbul ignore next */ require;

    this.testRunner = loader('jest');
  }

  public run(jestConfig: any, projectRoot: string): Promise<any> {
    jestConfig.reporters = [];
    const config = JSON.stringify(jestConfig);
    this.log.trace(`Invoking Jest with config ${config}`);

    return new Promise((resolve) => {
      this.testRunner.runCLI({
        config: config,
        runInBand: true,
        silent: true
      }, [projectRoot], (results: any) => resolve({ results }));
    });
  }
}