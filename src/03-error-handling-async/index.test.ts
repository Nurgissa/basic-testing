// Uncomment the code below and write your tests
import {
  throwError,
  resolveValue,
  throwCustomError,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect(await resolveValue('foo')).toBe('foo');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('my-custom-message')).toThrow('my-custom-message');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow(/Oops!/);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(
      'This is my awesome custom error!',
    );
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
