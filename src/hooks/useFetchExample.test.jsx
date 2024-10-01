import { act, renderHook } from "@testing-library/react";
import useFetchExample from "./useFetchExample";
import { createServer, server } from "../../tests/mock/server";
import { HttpResponse, delay, http } from "msw";
import { describe } from "vitest";

describe.only("useFetch", () => {
  describe("Initial and success case", () => {
    createServer([
      {
        url: "http://localhost:3004/todos",
        response: [
          { id: 1, name: "todo1", complete: false },
          { id: 2, name: "todo2", complete: true },
          { id: 3, name: "todo3", complete: false },
        ],
      },
    ]);

    it("should render initial values", () => {
      const { result } = renderHook(() => useFetchExample("/todos"));
      const [{ response, isLoading, error }, doFetch] = result.current;
      expect(response).toBe(null);
      expect(isLoading).toBe(false);
      expect(error).toBe(null);
      expect(doFetch).toBeDefined();
    });

    it("should fetch data successfully", async () => {
      const { result } = renderHook(() => useFetchExample("/todos"));
      await act(async () => {
        result.current[1]();
      });
      const [{ response, isLoading, error }] = result.current;
      expect(response).toHaveLength(3);
      expect(isLoading).toBe(false);
      expect(error).toBe(null);
    });
  });

  /////////////////////////////////////////////////////
  describe("Loading case", () => {
    createServer([
      {
        url: "http://localhost:3004/todos",
        response: [],
        delay: 1000,
      },
    ]);

    it("should show loading state when fetching data", async () => {
      const { result } = renderHook(() => useFetchExample("/todos"));
      await act(async () => {
        result.current[1]();
      });
      const [{ response, isLoading, error }] = result.current;
      expect(response).toBe(null);
      expect(isLoading).toBe(true);
      expect(error).toBe(null);
    });
  });
  ///////////////////////////

  //   ///////////////////////////
  describe("Error case", () => {
    createServer([
      {
        url: "http://localhost:3004/todos",
        response: [
          {
            message: "Not Found",
          },
        ],
        status: 404,
      },
    ]);

    it("should fetch data unsuccessfully", async () => {
      const { result } = renderHook(() => useFetchExample("/todos"));
      await act(async () => {
        result.current[1]();
      });
      const [{ response, isLoading, error }] = result.current;
      expect(response).toBe(null);
      expect(isLoading).toBe(false);
      expect(error).toBe(error);
      console.log(result.current[0]);
    });
  });
});
