import { describe, expect, test } from 'vitest';
import sum from './sum';

describe('Cheking adding', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  test('adds 3 + 2 to equal 3', () => {
    expect(sum(3, 2)).toBe(5);
  });
});
