import { act, renderHook } from "@testing-library/react";
import useFetchExample from "./useFetchExample";
import { server } from "../../tests/mock/server";
import { HttpResponse, delay, http } from "msw";

describe.only("useFetch", () => {
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
  ///////////////////////////
  it("should show loading state when fetching data", async () => {
    server.use(
      http.get("http://localhost:3004/todos", async () => {
        await delay(4000);
        return HttpResponse.json([]);
      })
    );
    const { result } = renderHook(() => useFetchExample("/todos"));
    await act(async () => {
      result.current[1]();
    });
    const [{ response, isLoading, error }] = result.current;
    expect(response).toBe(null);
    expect(isLoading).toBe(true);
    expect(error).toBe(null);
  });
  //   ///////////////////////////
  it("should fetch data unsuccessfully", async () => {
    server.use(
      http.get("http://localhost:3004/todos", () => {
        return HttpResponse.json({ message: "Not Found" }, { status: 404 });
      })
    );
    const { result } = renderHook(() => useFetchExample("/todos"));
    await act(async () => {
      result.current[1]();
    });
    const [{ response, isLoading, error }] = result.current;
    expect(response).toBe(null);
    expect(isLoading).toBe(false);
    expect(error).toBe(error);
  });
});
