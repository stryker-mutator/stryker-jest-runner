import JestTestAdapter from './JestTestAdapter';

export default class JestCallbackTestAdapter implements JestTestAdapter {
  private testRunner: any;
  
  public constructor(loader?: NodeRequire) {
    loader = loader || require;

    this.testRunner = loader('jest');
  }

  public run(config: any, projectRoot: string): Promise<any> {
    config.reporters = [];

    return new Promise((resolve) => {
      this.testRunner.runCLI({ 
        config: JSON.stringify(config), 
        runInBand: true,
        silent: true
      }, [projectRoot], resolve);
    });
  }
}