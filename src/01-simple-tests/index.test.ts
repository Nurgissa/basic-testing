// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({
      a: 1,
      b: 2,
      action: Action.Add
    })).toEqual(3);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({
      a: 10,
      b: 2,
      action: Action.Subtract
    })).toEqual(8);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({
      a: 10,
      b: 2,
      action: Action.Multiply
    })).toEqual(20);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({
      a: 10,
      b: 2,
      action: Action.Divide
    })).toEqual(5);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({
      a: 10,
      b: 2,
      action: Action.Exponentiate
    })).toEqual(100);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({
      a: 10,
      b: 2,
      action: 'unknown-action'
    })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({
      a: 'non valid value',
      b: false,
      action: Action.Add
    })).toBeNull();
  });
});
