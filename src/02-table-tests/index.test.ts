// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  // Addition cases
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  // Subtraction cases
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 10, b: 7, action: Action.Subtract, expected: 3 },
  { a: 0, b: 5, action: Action.Subtract, expected: -5 },

  // Multiplication cases
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 4, b: 4, action: Action.Multiply, expected: 16 },
  { a: 0, b: 10, action: Action.Multiply, expected: 0 },

  // Division cases
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 0, b: 5, action: Action.Divide, expected: 0 },

  // Exponentiation cases
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 5, b: 0, action: Action.Exponentiate, expected: 1 },
];

const invalidTestCases = [
  // Invalid action
  { a: 1, b: 2, action: 'invalid', expected: null },
  { a: 3, b: 4, action: undefined, expected: null },

  // Invalid operands
  { a: 'invalid', b: 2, action: Action.Add, expected: null },
  { a: 1, b: 'invalid', action: Action.Subtract, expected: null },
  { a: null, b: 3, action: Action.Multiply, expected: null },
  { a: 4, b: null, action: Action.Divide, expected: null },
  { a: undefined, b: 5, action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator tests 2', () => {
  test.each(testCases)(
    'should calculate valid test cases',
    ({ a, b, action, expected }) => {
      const removed = simpleCalculator({ a, b, action });
      expect(removed).toBe(expected);
    },
  );

  test.each(invalidTestCases)(
    'should return null for invalid test cases',
    ({ a, b, action, expected }) => {
      const removed = simpleCalculator({ a, b, action });
      expect(removed).toBe(expected);
    },
  );
});
