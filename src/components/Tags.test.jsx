import { render, screen } from "@testing-library/react";
import Tags from "./Tags";
import axios from "axios";

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

  it("should render tag axios spy", async () => {
    vi.spyOn(axios, "get").mockResolvedValue({
      data: [{ id: 1, name: "tag1" }],
    });
    render(<Tags />);
    const tags = await screen.findAllByTestId("tag");
    expect(tags).toHaveLength(1);
  });
});
