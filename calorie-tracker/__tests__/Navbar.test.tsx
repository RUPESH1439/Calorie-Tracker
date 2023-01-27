import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import Navbar from "../components/Navbar";

describe("Nav bar", () => {
  it("renders Navbar component with no user", () => {
    render(<Navbar />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByText("Your Calorie Tracker!")).toBeInTheDocument();
  });
});
