import JestCallbackTestAdapter from "../../../src/jestTestAdapters/JestCallbackTestAdapter";
import { expect } from 'chai';

describe("JestCallbackTestAdapter", () => {
  let jestCallbackTestAdapter: JestCallbackTestAdapter;

  let projectRoot = '/path/to/project';
  let jestConfig = { rootDir: projectRoot };

  beforeEach(() => {
    jestCallbackTestAdapter = new JestCallbackTestAdapter;
  });

  it('should throw a not implemented error', () => {
    expect(() => jestCallbackTestAdapter.run(jestConfig, projectRoot)).to.throw(Error, 'Not yet implemented');
  });
});