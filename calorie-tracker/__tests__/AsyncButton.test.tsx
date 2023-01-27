import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import AsyncButton from "../components/AsyncButton";

describe("Async Button", () => {
  it("renders AsyncButton component with title", () => {
    render(<AsyncButton title="Test" loading={false} />);
    expect(screen.getByText(/Test/)).toBeInTheDocument();
  });
  it("renders AsyncButton component with loading progress", () => {
    render(<AsyncButton title="Test" loading={true} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
