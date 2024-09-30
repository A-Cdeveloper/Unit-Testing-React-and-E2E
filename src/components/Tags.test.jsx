import { render, screen } from "@testing-library/react";
import Tags from "./Tags";

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
