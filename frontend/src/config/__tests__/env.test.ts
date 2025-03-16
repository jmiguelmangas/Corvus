import { config } from '../env';

describe('Environment Configuration', () => {
  test('config should be defined', () => {
    expect(config).toBeDefined();
  });

  test('API_URL should be defined', () => {
    expect(config.API_URL).toBeDefined();
  });

  test('API_URL should be a string', () => {
    expect(typeof config.API_URL).toBe('string');
  });

  test('API_URL should be a valid URL', () => {
    expect(() => new URL(config.API_URL)).not.toThrow();
  });

  test('API_URL should point to localhost:8001', () => {
    expect(config.API_URL).toBe('http://localhost:8001');
  });
});
