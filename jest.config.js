export default {
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.js'],
    testTimeout: 60000,
    setupFilesAfterEnv: ['./jest.setup.js'],
    modulePathIgnorePatterns: [
        '<rootDir>/gpt-pilot/'
    ],
    globalSetup: './tests/test-setup.js',
    globalTeardown: './tests/test-teardown.js',
    transform: {
        '^.+\\.(t|j)sx?$': ['@swc/jest']
    },
    type: 'module'
};
