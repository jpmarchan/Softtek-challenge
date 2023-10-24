module.exports = {
    automock: true,
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).ts'], // Patrón de búsqueda de archivos de prueba
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
  };