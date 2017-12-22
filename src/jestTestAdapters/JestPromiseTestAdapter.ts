import JestTestAdapter from './JestTestAdapter';

export default class JestPromiseTestAdapter implements JestTestAdapter {
  private testRunner: any;
  
  public constructor(loader?: NodeRequire) {
    loader = loader || require;

    this.testRunner = loader('jest').runCLI;
  }

  public run(config: any, projectRoot: string): Promise<any> {
    config.reporters = [];

    return this.testRunner({
      config: JSON.stringify(config),
      runInBand: true,
      silent: true
    }, [projectRoot]);
  }
}