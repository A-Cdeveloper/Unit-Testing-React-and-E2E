import { render, screen } from "@testing-library/react";

import Username from "./Username";
import userEvent from "@testing-library/user-event";

describe("Username", () => {
  it("should render default empty text", () => {
    render(<Username />);
    expect(screen.getByTestId("username")).toHaveTextContent("");
  });
  ///
  it("shold render changed username with button click", async () => {
    render(<Username />);
    const user = userEvent.setup();
    await user.click(screen.getByTestId("button"));
    expect(screen.getByTestId("username")).toHaveTextContent("bar");
  });

  ///
  it("shold render changed username with input type", async () => {
    render(<Username />);
    const user = userEvent.setup();
    await user.type(screen.getByTestId("usernameInput"), "aleksandar");
    expect(screen.getByTestId("username")).toHaveTextContent("aleksandar");
  });
});
