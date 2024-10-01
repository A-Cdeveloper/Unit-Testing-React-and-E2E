import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:3004/tags", async () => {
    return HttpResponse.json([
      { id: 1, name: "tag1" },
      { id: 2, name: "tag2" },
      { id: 3, name: "tag3" },
    ]);
  }),

  http.get("http://localhost:3004/todos", async () => {
    return HttpResponse.json([
      { id: 1, name: "todo1", complete: false },
      { id: 2, name: "todo2", complete: true },
      { id: 3, name: "todo3", complete: false },
    ]);
  }),
];
