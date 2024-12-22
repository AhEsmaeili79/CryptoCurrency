export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest" 
    // process `*.tsx` files with `ts-jest`
    },
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',

        "^@pagesComp(.*)$": "<rootDir>/src/components/pages/$1",
        "^@common(.*)$": "<rootDir>/src/components/common/$1",
        "^@data(.*)$": "<rootDir>/src/assets/index",
        "^@assets(.*)$": "<rootDir>/src/assets/$1",
        "^@pages(.*)$": "<rootDir>/src/pages/$1",
        "^@routes(.*)$": "<rootDir>/src/routes/$1",
        "^@layout(.*)$": "<rootDir>/src/layout/$1",
        "^@config(.*)$": "<rootDir>/src/config/$1",
        "^@hooks(.*)$": "<rootDir>/src/hooks/$1",
        "^@utils(.*)$": "<rootDir>/src/utils/$1",
        "^@store(.*)$": "<rootDir>/src/store/$1",
        "^@api(.*)$": "<rootDir>/src/api/$1",


    },
}