module.exports = function(config) {
  config.set({
    files: [
      '!src/**/*.ts',

      { pattern: 'src/**/*.ts', included: false, mutated: true },

      // Exclude all .d.ts files
      '!**/*.d.ts',

      // Exclude interface and index file
      '!./src/configLoaders/JestConfiguration.ts',
      '!./src/index.ts',

      // Stryker crashes on integration tests, don't run them
      '!./test/integration/**/*'
    ],
    testRunner: 'mocha',
    testFramework: 'mocha',
    mutator: 'typescript',
    transpilers: ['typescript'],
    reporter: ['clear-text', 'progress', 'html'],
    tsconfigFile: 'tsconfig.json',
    coverageAnalysis: 'off',
    logLevel: 'info'
  });
};