import { getLogger } from 'log4js';

import JestTestAdapter from './JestTestAdapter';
import JestPromiseAdapter from './JestPromiseTestAdapter';
import JestCallbackAdapter from './JestCallbackTestAdapter';
import * as semver from 'semver';

export default class JestTestAdapterFactory {
  private static log = getLogger(JestTestAdapterFactory.name);

  public static getJestTestAdapter(loader?: NodeRequire): JestTestAdapter {
    const jestVersion = this.getJestVersion(loader || /* istanbul ignore next */ require);

    if (semver.satisfies(jestVersion, '<20.0.0')) {
      JestTestAdapterFactory.log.debug(`Detected Jest below 20.0.0`);
      throw new Error('You need Jest version >= 20.0.0 to use Stryker');
    } else if (semver.satisfies(jestVersion, '>=20.0.0 <21.0.0')) {
      JestTestAdapterFactory.log.debug(`Detected Jest between 20.0.0 and 21.0.0`);
      return new JestCallbackAdapter();
    } else {
      JestTestAdapterFactory.log.debug(`Detected Jest between above 21.0.0`);
      return new JestPromiseAdapter();
    }
  }

  private static getJestVersion(loader: NodeRequire): string {
    const packageJson = loader('jest/package.json');

    return packageJson.version;
  }
}