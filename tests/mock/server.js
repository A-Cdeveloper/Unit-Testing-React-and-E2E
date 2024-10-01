import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { beforeAll } from "vitest";

//

export const createServer = (handlerConfig) => {
  const handlers = handlerConfig.map((handler) => {
    const { method, url, response, delay, status } = handler;
    return http[method || "get"](url, async () => {
      if (delay) {
        await delay(4000);
      }

      if (status === 404) {
        return HttpResponse.json(response, { status });
      }

      return HttpResponse.json(response);
    });
  });

  const server = setupServer(...handlers);

  beforeAll(() => {
    server.listen();
    //console.log("SERVER START...");
  });
  afterEach(() => {
    server.resetHandlers();
    //console.log("SERVER RESET HANDLERS...");
  });
  afterAll(() => {
    server.close();
    //console.log("SERVER END...");
  });
};
