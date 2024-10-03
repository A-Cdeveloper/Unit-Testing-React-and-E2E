import { render, screen, waitFor, act } from "@testing-library/react";

import Waiter from "./Waiter";
import { afterEach, beforeEach, expect } from "vitest";

describe("Waiter", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("displays 'passed' after 2 seconds", async () => {
    render(<Waiter />);

    // Fast-forward time by 2 seconds
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // Now the text should be 'passed'
    const waiter = await screen.findByTestId("waiter");
    expect(waiter).toHaveTextContent("passed");
    // screen.debug();
  }, 5000);
});
