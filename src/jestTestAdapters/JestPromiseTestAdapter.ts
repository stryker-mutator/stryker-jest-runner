import JestTestAdapter from './JestTestAdapter';

export default class JestPromiseTestAdapter implements JestTestAdapter {
  public run(config: Object, projectRoot: string): Promise<any> {
    throw new Error('Not yet implemented');
  }
}