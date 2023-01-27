import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import Loading from "../components/Loading";

describe("Loading", () => {
  it("renders Loading component with loading progress", () => {
    render(<Loading />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
