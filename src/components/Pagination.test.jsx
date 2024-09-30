import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Pagination from "./Pagination";
import * as utils from "../utils";
import { expect } from "vitest";

vi.mock("../utils", () => ({
  range: () => [1, 2, 3, 4, 5],
}));

describe("Pagination", () => {
  ///
  it("should render component correctly", () => {
    render(<Pagination total={50} limit={10} currentPage={1} />);

    const listItems = screen.getAllByTestId("page-container");
    expect(listItems).toHaveLength(5);

    listItems.forEach((item) => {
      expect(item).toHaveTextContent(item.textContent);
    });
  });
  ////

  it("should select page correctly", () => {
    const selectPageMockFn = vi.fn();
    render(
      <Pagination
        total={50}
        limit={10}
        currentPage={1}
        selectPage={selectPageMockFn}
      />
    );
    screen.debug();

    const listItems = screen.getAllByTestId("page-container");
    const user = userEvent.setup();
    listItems.forEach(async (item) => {
      await user.click();
      expect(selectPage).toHaveBeenCalledWith(item.textContent);
    });
  });

  //   it("spy on utils", () => {
  //     vi.spyOn(utils, "range");
  //     render(<Pagination total={50} limit={10} currentPage={1} />);
  //     expect(utils.range).toHaveBeenCalledWith(1, 6);
  //   });
});
