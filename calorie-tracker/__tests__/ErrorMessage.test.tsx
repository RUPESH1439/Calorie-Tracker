import { fireEvent, getByRole, render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import ErrorMessage from "../components/ErrorMessage";

describe("ErrorMessage", () => {
  it("should render nothing when error is not provided", () => {
    const { container } = render(<ErrorMessage />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders ErrorMessage with error message", () => {
    render(<ErrorMessage error="Error" />);
    expect(screen.getByText("Error")).toBeInTheDocument();
  });
});
