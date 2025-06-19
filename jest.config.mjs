const config = {
  // Simulate the browser environment for testing React components
  testEnvironment: "jsdom",

  // Setup global test config (e.g., jest-dom)
  setupFilesAfterEnv: ["<rootDir>/src/tests/setup.js"],

  // Recognize both src and test directory test files
  testMatch: [
    "**/tests/**/*.test.[jt]s?(x)",
    "**/tests/**/*.spec.[jt]s?(x)",
    "**/src/**/*.test.[jt]s?(x)",
    "**/src/**/*.spec.[jt]s?(x)",
  ],

  // Code coverage config
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/**/*.test.{js,jsx}",
    "!src/config/**",
    "!src/**/index.{js,jsx}",
    "!src/**/types.{js,jsx}",
  ],

  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  // Handle module aliasing like "@/components"
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  // Transform JSX and modern JS using Next.js' default Babel config
  transform: {
    "^.+\\.(js|jsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
};

export default config;
