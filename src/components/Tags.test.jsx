import { render, screen } from "@testing-library/react";
import Tags from "./Tags";
import { setupServer } from "msw/node";
import { HttpResponse, delay, http } from "msw";

const server = setupServer(
  http.get("http://localhost:3004/tags", async () => {
    return HttpResponse.json([
      { id: 1, name: "tag1" },
      { id: 2, name: "tag2" },
      { id: 3, name: "tag3" },
    ]);
  })
);
beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

/////////

describe("Tags", () => {
  it("should render tags", async () => {
    render(<Tags />);
    const tags = await screen.findAllByTestId("tag");
    expect(tags).toHaveLength(3);
    tags.forEach((tag, index) => {
      expect(tag).toHaveTextContent(`tag${index + 1}`);
    });
  });
});
