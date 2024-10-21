// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
    unmockedFunction: originalModule.unmockedFunction,
  };
});

describe('partial mocking', () => {
  beforeEach(jest.resetAllMocks);

  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const consoleSpy = jest.spyOn(global.console, 'log');

    mockOne();
    mockTwo();
    mockThree();

    expect(mockOne).toBeCalled();
    expect(mockTwo).toBeCalled();
    expect(mockThree).toBeCalled();

    expect(consoleSpy).not.toBeCalled();
  });

  test('unmockedFunction should log into console', () => {
    const consoleSpy = jest.spyOn(global.console, 'log');

    unmockedFunction();
    expect(consoleSpy).toBeCalledWith('I am not mocked');
  });
});
