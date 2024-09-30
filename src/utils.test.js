import { describe, expect } from "vitest";
import { range } from "./utils";

describe("utils", () => {
  describe("simple always passing test", () => {
    it("return true", () => {
      expect(true).toBe(true);
    });
  });

  describe("range", () => {
    it("return correct range from 1 to 5", () => {
      const result = range(1, 5);
      expect(result).toEqual([1, 2, 3, 4]);
      expect(result).toHaveLength(4);
    });
  });
});
