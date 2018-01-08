import JestTestAdapter from "./JestTestAdapter";
import JestPromiseAdapter from './JestPromiseTestAdapter';
import JestCallbackAdapter from './JestCallbackTestAdapter';
import * as semver from 'semver';

export default class JestTestAdapterFactory {
  public static getJestTestAdapter(loader?: NodeRequire): JestTestAdapter {
    let jestTestAdapter: JestTestAdapter;

    switch(this.getJestType(loader)) {
      case 'promise': 
        jestTestAdapter = new JestPromiseAdapter;
      break;
      case 'callback':
        jestTestAdapter = new JestCallbackAdapter;
      break;
      default:
        throw new Error('You need Jest version >= 20.0.0 to use Stryker');
    }

    return jestTestAdapter;
  }

  private static getJestType(loader?: NodeRequire): 'promise' | 'callback' | 'invalid' {
    loader = loader || /* istanbul ignore next */ require;

    const jestVersion = loader('jest/package.json').version;

    if(semver.satisfies(jestVersion, '<20.0.0')) {
      return 'invalid';
    } else if(semver.satisfies(jestVersion, '>=20.0.0 <21.0.0')) {
      return 'callback';
    } else {
      return 'promise';
    }
  }
}