import JestTestAdapter from './JestTestAdapter';

export default class JestCallbackTestAdapter implements JestTestAdapter {
  public run(config: Object, projectRoot: string): Promise<any> {
    throw new Error('Not yet implemented');
  }
}