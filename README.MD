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
Set your test runner to `jest` in the stryker config, optionally provide the project you're working on for a preset configuration.
We currently only support `react` preset, enable it by adding the following config entry to the stryker config:

```javascript
jest: {
    project: 'react'
}
```

### Loading the plugin
In order to use the `stryker-jest-runner` it must be loaded in the Stryker mutation testing framework via the Stryker configuration. The easiest way to achieve this, is not have a plugins section in your config file. That way, all node_modules starting with `stryker-` will be loaded.

## Using the test runner
In order to use Jest as the test runner, you simply specify it in your stryker config file:

```javascript
module.exports = function (config) {
  config.set({
    ...
    testRunner: 'jest'
    ...
  }
}
```

Note that coverageAnalysis is not yet supported, so you must explicitly set it to off in your Stryker configration. Pull requests are - obviously - welcome.

```javascript
module.exports = function (config) {
  config.set({
    ...
    coverageAnalysis: 'off'
    ...
  }
}
```

## Contributing
Before you start hacking along, make sure to install a supported version of Jest inside your working copy. The versions supported are listed above. Also make sure to read the Stryker contribution guidelines located in the [Stryker mono repository](https://github.com/stryker-mutator/stryker/blob/master/CONTRIBUTING.md).
