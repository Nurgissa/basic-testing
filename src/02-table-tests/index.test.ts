import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 3, b: 4, action: Action.Subtract, expected: -1 },
  { a: -3, b: 4, action: Action.Subtract, expected: -7 },
  { a: -3, b: -4, action: Action.Multiply, expected: 12 },
  { a: -3, b: 4, action: Action.Multiply, expected: -12 },
  { a: 3, b: 4, action: Action.Multiply, expected: 12 },
  { a: 0, b: 4, action: Action.Multiply, expected: 0 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 2, b: 10, action: Action.Divide, expected: 0.2 },
  { a: 0, b: 10, action: Action.Divide, expected: 0 },
  { a: 10, b: 0, action: Action.Divide, expected: Infinity },
  { a: 10, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 10, b: 1, action: Action.Exponentiate, expected: 10 },
  { a: 10, b: 2, action: Action.Exponentiate, expected: 100 },
];

describe('simpleCalculator', () => {
  it.each(testCases)(
    '$a $action $b = $expected',
    ({ a, b, action, expected }) => {
      expect(
        simpleCalculator({
          a,
          b,
          action,
        }),
      ).toBe(expected);
    },
  );
});
