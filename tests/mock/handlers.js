import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:3004/tags", async () => {
    return HttpResponse.json([
      { id: 1, name: "tag1" },
      { id: 2, name: "tag2" },
      { id: 3, name: "tag3" },
    ]);
  }),
];
