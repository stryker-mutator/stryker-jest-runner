import * as chai from 'chai';
import JestTestRunner from '../../src/JestTestRunner';
import { RunnerOptions, RunResult, RunStatus, TestStatus } from 'stryker-api/test_runner';
import * as chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
let expect = chai.expect;

describe('JestTestRunner', function () {
    let sut: JestTestRunner;
    this.timeout(10000);

    let expectToHaveSuccessfulTests = (result: RunResult, n: number) => {
        expect(result.tests.filter(t => t.status === TestStatus.Success)).to.have.length(n);
    };

    let expectToHaveFailedTests = (result: RunResult, expectedFailureMessages: string[]) => {
        const actualFailedTests = result.tests.filter(t => t.status === TestStatus.Failed);
        expect(actualFailedTests).to.have.length(expectedFailureMessages.length);
        actualFailedTests.forEach(failedTest => expect(failedTest.failureMessages[0]).to.contain(expectedFailureMessages.shift()));
    };

    describe('when all tests succeed', () => {
        let testRunnerOptions: RunnerOptions;

        before(() => {
            testRunnerOptions = {
                files: [
                    { path: 'testResources/sampleProject/src/Add.js', mutated: true, included: true },
                    { path: 'testResources/sampleProject/src/__tests__/AddSpec.js', mutated: false, included: true }],
                port: 9877,
                strykerOptions: { logLevel: 'trace' }
            };
        });

        describe('with simple add function to test', () => {
            before(() => {
                sut = new JestTestRunner(testRunnerOptions);
                return sut.init();
            });

            it('should report completed tests', () => {
                return expect(sut.run()).to.eventually.satisfy((runResult: RunResult) => {
                    expectToHaveSuccessfulTests(runResult, 5);
                    expectToHaveFailedTests(runResult, []);
                    expect(runResult.status).to.be.eq(RunStatus.Complete);
                    return true;
                });
            });

            it('should be able to run twice in quick succession',
                () => expect(sut.run().then(() => sut.run())).to.eventually.have.property('status', RunStatus.Complete));
        });
    });
});