import JestPromiseTestAdapter from "../../../src/jestTestAdapters/JestPromiseTestAdapter";
import { expect } from 'chai';

describe("JestPromiseTestAdapter", () => {
  let jestPromiseTestAdapter: JestPromiseTestAdapter;

  let projectRoot = '/path/to/project';
  let jestConfig = { rootDir: projectRoot };

  beforeEach(() => {
    jestPromiseTestAdapter = new JestPromiseTestAdapter;
  });

  it('should throw a not implemented error', () => {
    expect(() => jestPromiseTestAdapter.run(jestConfig, projectRoot)).to.throw(Error, 'Not yet implemented');
  });
});