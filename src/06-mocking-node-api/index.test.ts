// Uncomment the code below and write your tests

import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import { join } from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

jest.mock('fs');
jest.mock('path');
jest.mock('process');
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setTimeout');
    const callback = () => console.log('success');
    doStuffByTimeout(callback, 10000);
    expect(spy).toHaveBeenCalledWith(callback, 10000);
  });

  test('should call callback only after timeout', () => {
    const spy = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();

    doStuffByTimeout(callback, 10000);

    expect(spy).toHaveBeenCalledWith(callback, 10000);

    jest.advanceTimersByTime(10000);

    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setInterval');
    const callback = () => console.log('success');

    doStuffByInterval(callback, 10000);

    expect(spy).toHaveBeenCalledWith(callback, 10000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const spy = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();

    doStuffByInterval(callback, 10000);

    expect(spy).toHaveBeenCalledWith(callback, 10000);

    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(1);

    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  afterAll(jest.clearAllMocks);

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously('some-path');

    expect(join).toBeCalledWith(expect.anything(), 'some-path');
  });

  test('should return null if file does not exist', async () => {
    jest.mocked(existsSync).mockReturnValueOnce(false);

    const result = await readFileAsynchronously('some-path');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'content of the file';

    jest.mocked(existsSync).mockReturnValueOnce(true);
    jest.mocked(readFile).mockResolvedValueOnce(fileContent);

    const result = await readFileAsynchronously('some-path');

    expect(result).toEqual(fileContent);
  });
});
