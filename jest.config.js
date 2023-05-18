module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    testMatch: ['**/__tests__/**/*.test.ts'],
    collectCoverage: true,
    coverageReporters: ['text', 'html'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: [],
    globals: {
      'ts-jest': {
        tsconfig: './tsconfig.json' // Adjust the path to your tsconfig.json file
      }
    }
  };
  