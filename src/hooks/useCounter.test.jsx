import { act, renderHook } from "@testing-library/react";
import useCounter from "./useCounter";

describe("useCounter", () => {
  it("should render default state with 0", () => {
    const { result } = renderHook(() => useCounter(0));
    expect(result.current.count).toBe(0);
  });

  it("should increment count", () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(11);
  });
});
