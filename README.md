[![Build Status](https://travis-ci.org/stryker-mutator/stryker-jest-runner.svg?branch=master)](https://travis-ci.org/stryker-mutator/stryker-jest-runner)
[![Gitter](https://badges.gitter.im/stryker-mutator/stryker.svg)](https://gitter.im/stryker-mutator/stryker?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

![Stryker](https://github.com/stryker-mutator/stryker/raw/master/stryker-80x80.png)

# Stryker-jest-runner

## Installation
Install stryker-jest-runner locally within your project folder, like so:

```bash
npm i --save-dev stryker-jest-runner
```

## Peer dependencies
The stryker-jest-runner is a plugin for Stryker to enable Jest as a test runner. As such, you should make sure you have the correct versions of its dependencies installed:

- jest
- stryker-api

For the minimum supported versions, see the peerDependencies section in package.json.

## Configuration
Make sure you set the `testRunner` option to "jest" and set `coverageAnalysis` to "off" in your Stryker configuration.

```javascript
{
    testRunner: 'jest'
    coverageAnalysis: 'off'
}
```

Stryker-jest-runner provides a couple of configurable options using the `jest` property in your stryker config:

```javascript
{
    jest: {
        project: 'react',
        config: require('path/to/your/custom/jestConfig.js')
    }
}
```

| option | value |
|----|----|
| project (optional) | The project you are working on (we currently only support "react")|
| config (optional) | A custom jest configuration (you can also use `require` to load your config here) |

**Note:** the `project` option is ignored when the `config` option is specified.

## Loading the plugin
In order to use the `stryker-jest-runner` it must be loaded in the Stryker mutation testing framework via the Stryker configuration. The easiest way to achieve this, is not have a plugins section in your config file. That way, all node_modules starting with `stryker-` will be loaded.

## Contributing
Make sure to read the Stryker contribution guidelines located in the [Stryker mono repository](https://github.com/stryker-mutator/stryker/blob/master/CONTRIBUTING.md).
