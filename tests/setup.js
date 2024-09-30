import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { vi, afterEach } from "vitest";
import { server } from "./mock/server";

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
  cleanup();
  vi.clearAllMocks();
});
