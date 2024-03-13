module.exports={
    roots: ['<rootDir>/src'],
    collectCoverageFrom:[
        '<rootDir>/src/**/*.{ts,tsx}',
    ],
    testEnvironment: 'node',
    coverageDirectory: 'coverage',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
}