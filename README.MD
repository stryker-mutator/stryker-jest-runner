[![Build Status](https://travis-ci.org/Archcry/stryker-jest-runner.svg?branch=master)](https://travis-ci.org/Archcry/stryker-jest-runner)
[![BCH compliance](https://bettercodehub.com/edge/badge/Archcry/stryker-jest-runner?branch=master)](https://bettercodehub.com/)

![Stryker](https://github.com/stryker-mutator/stryker/raw/master/stryker-80x80.png)

# Stryker-jest-runner

## Installation
Installation is easy, just `npm install stryker-jest-runner`

## Configuration within Stryker
Set your test runner to `jest` in the stryker config, optionally provide the project you're working on for a preset configuration.
We currently only support `react` preset, enable it by adding the following config entry to the stryker config:
```javascript
jest: {
    project: 'react'
}
```