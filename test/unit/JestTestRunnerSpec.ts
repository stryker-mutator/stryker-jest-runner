import JestTestAdapterFactory from '../../src/jestTestAdapters/JestTestAdapterFactory';
import JestTestRunner from '../../src/JestTestRunner';
import { Config } from 'stryker-api/config';
import * as fakeResults from '../helpers/testResultProducer';
import * as sinon from 'sinon';
import { assert, expect } from 'chai';

describe('JestTestRunner', () => {
  let sandbox: sinon.SinonSandbox;
  let jestTestAdapterFactoryStub: sinon.SinonStub;
  let runJestStub: sinon.SinonStub;

  let strykerOptions: Config;
  let jestTestRunner: JestTestRunner;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    runJestStub = sinon.stub();
    runJestStub.returns(Promise.resolve(fakeResults.createSuccessResult()));

    strykerOptions = new Config;
    strykerOptions.set({ jest: { config: '{ "property": "value" }' }})

    jestTestRunner = new JestTestRunner({
      files: [],
      port: 0,
      strykerOptions
    });
    
    jestTestAdapterFactoryStub = sandbox.stub(JestTestAdapterFactory, 'getJestTestAdapter');
    jestTestAdapterFactoryStub.returns({
      run: runJestStub
    });
  });

  afterEach(() => sandbox.restore());

  it('should call jestTestAdapterFactory "getJestTestAdapter" method to obtain a testRunner', async () => {
    await jestTestRunner.run();

    assert(jestTestAdapterFactoryStub.called);
  });

  it('should call the run function with the provided config and the projectRoot', async () => {
    await jestTestRunner.run();

    assert(runJestStub.called);
  });

  it('should call the return a correct runResult', async () => {
    const result = await jestTestRunner.run();

    expect(result).to.deep.equal({ tests: 
      [ { name: 'App renders without crashing',
          status: 0,
          timeSpentMs: 23,
          failureMessages: [] } ],
     status: 0 });
  });
});