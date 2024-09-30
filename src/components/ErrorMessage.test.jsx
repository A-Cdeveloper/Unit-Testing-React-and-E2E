import { render, screen } from "@testing-library/react";

import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage", () => {
  it("should render correctly default error state", () => {
    render(<ErrorMessage />);
    expect(screen.getByTestId(/error/i)).toBeInTheDocument();
    expect(screen.getByTestId(/error/i)).toHaveTextContent(
      /something went wrong/i
    );
  });

  it("should render correctly error state", () => {
    render(<ErrorMessage message="Other error" />);
    expect(screen.getByTestId(/error/i)).toBeInTheDocument();
    expect(screen.getByTestId(/error/i)).toHaveTextContent(/other error/i);
  });
});
