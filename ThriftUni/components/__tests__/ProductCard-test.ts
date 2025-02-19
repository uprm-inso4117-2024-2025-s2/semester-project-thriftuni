import  { formatCurrency }  from "@/utils/lib";
import {describe, expect, it} from "@jest/globals";

// Test formatPrice function
describe('formatPrice helper function', () => {
  it('should return formatted price', () => {
    expect(formatCurrency(1000)).toBe('$1,000.00');
  }),
  it('should return formatted price', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  }),
  it('should return formatted price', () => {
    expect(formatCurrency(100)).toBe('$100.00');
  }),
  it('should return formatted price', () => {
    expect(formatCurrency(100000)).toBe('$100,000.00');
  }),
  it('should return formatted price', () => {
    expect(formatCurrency(1000000)).toBe('$1,000,000.00');
  })
});


