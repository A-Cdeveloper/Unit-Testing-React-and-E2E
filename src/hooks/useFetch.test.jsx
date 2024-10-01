import { act, render, renderHook, screen } from "@testing-library/react";

import useFetch from "./useFetch";
import { expect, it, vi } from "vitest";
import axios from "axios";

describe("useFetch", () => {
  it("should render initial values", () => {
    const { result } = renderHook(() => useFetch("/todos"));
    const [{ response, isLoading, error }, doFetch] = result.current;
    expect(response).toBe(null);
    expect(isLoading).toBe(false);
    expect(error).toBe(null);
    expect(doFetch).toBeDefined();
  });

  it("should fetch data successfully", async () => {
    const mockResolvedValue = {
      data: [{ id: 1, name: "todo1", complete: false }],
    };
    vi.spyOn(axios, "request").mockResolvedValue(mockResolvedValue);
    const { result } = renderHook(() => useFetch("/todos"));
    await act(async () => {
      result.current[1]();
    });
    const [{ response, isLoading, error }] = result.current;
    expect(response).toBe(mockResolvedValue.data);
    expect(isLoading).toBe(false);
    expect(error).toBe(null);
  });
  ///////////////////////////
  it("should show loading state when fetching data", async () => {
    vi.spyOn(axios, "request").mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: [{ id: 1, name: "todo1", complete: false }],
          });
        }, 4000);
      });
    });
    const { result } = renderHook(() => useFetch("/todos"));
    await act(async () => {
      result.current[1]();
    });
    const [{ response, isLoading, error }] = result.current;
    expect(response).toBe(null);
    expect(isLoading).toBe(true);
    expect(error).toBe(null);
  });
  ///////////////////////////
  it("should fetch data unsuccessfully", async () => {
    const mockResolvedValue = {
      response: {
        data: { message: "Not Found" },
      },
    };
    vi.spyOn(axios, "request").mockRejectedValue(mockResolvedValue);
    const { result } = renderHook(() => useFetch("/todos"));
    await act(async () => {
      result.current[1]();
    });
    const [{ response, isLoading, error }] = result.current;
    expect(response).toBe(null);
    expect(isLoading).toBe(false);
    expect(error).toBe(error);
  });
});
