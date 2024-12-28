import { expect } from 'vitest';

const toHaveValidStyling = (element: HTMLElement, expectedStyles: Record<string, string>) => {
  const computedStyle = window.getComputedStyle(element);
  const mismatches: string[] = [];

  Object.entries(expectedStyles).forEach(([property, value]) => {
    if (computedStyle[property as any] !== value) {
      mismatches.push(`${property}: expected ${value}, got ${computedStyle[property as any]}`);
    }
  });

  return {
    pass: mismatches.length === 0,
    message: () => mismatches.join('\n')
  };
};

expect.extend({
  toHaveValidStyling
});