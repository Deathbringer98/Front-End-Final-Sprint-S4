module.exports = {
  transform: {
      '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
      '/node_modules/(?!axios/)' // Transform axios and any other ES modules
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  globals: {
      'babel-jest': {
          presets: ['@babel/preset-env', '@babel/preset-react'],
      },
  },
};