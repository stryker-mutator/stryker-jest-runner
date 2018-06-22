declare namespace Jest {
  function runCLI(cliParams: RunCliParameters, projectRoots: Array<String>): any 

  interface RunCliParameters {
    config: string;
    runInBand: boolean;
    silent: boolean;
  }

  interface Configuration {
    reporters: Array<any>;
    automock: boolean;
    browser: boolean;
    bail: boolean;
    cacheDirectory: Path;
    collectCoverage: boolean;
    collectCoverageFrom: Array<string>;
    coverageDirectory: string;
    coveragePathIgnorePatterns: string[];
    coverageReporters: Array<string>;
    forceCoverageMatch: Glob[];
    cwd: Path;
    detectLeaks: boolean;
    displayName: Maybe<string>;
    globals: ConfigGlobals;
    haste: HasteConfig;
    moduleDirectories: string[];
    moduleFileExtensions: string[];
    moduleLoader: Path;
    moduleNameMapper: Array<[string, string]>;
    modulePathIgnorePatterns: string[];
    modulePaths: string[];
    name: string;
    resetMocks: boolean;
    resetModules: boolean;
    resolver: Maybe<Path>;
    rootDir: Path;
    roots: Path[];
    runner: string;
    setupFiles: Path[];
    setupTestFrameworkScriptFile: Path;
    skipNodeResolution: boolean;
    snapshotSerializers: Path[];
    testEnvironment: string;
    testEnvironmentOptions: object;
    testLocationInResults: boolean;
    testMatch: Glob[];
    testPathIgnorePatterns: string[];
    testRegex: string;
    testRunner: string;
    testURL: string;
    timers: 'real' | 'fake';
    transform: Array<[string, Path]>;
    transformIgnorePatterns: Glob[];
    unmockedModulePathPatterns: Maybe<string[]>;
    watchPathIgnorePatterns: string[];
    testResultsProcessor?: string;
    verbose: boolean;
  }

  interface HasteConfig {
    defaultPlatform?: Maybe<string>;
    hasteImplModulePath?: string;
    platforms?: string[];
    providesModuleNodeModules: string[];
  }

  type Path = string;
  type Glob = string;
  type ConfigGlobals = object;
  type Maybe<T> = void | null | undefined | T;
}

declare module "jest" {
  export = Jest;
}