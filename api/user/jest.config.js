module.exports = {
    preset: 'ts-jest',
    testEnvironment: './custom-jest-env.js',
    roots: ['src', '__tests__'],
    coverageDirectory: 'reports/coverage',
    globalSetup: './global-setup.js',
    moduleNameMapper: {
        '^csv-parse/sync': '<rootDir>/node_modules/csv-parse/dist/cjs/sync.cjs',
    },
};
