import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import SignIn from "../components/SignIn";

describe("SignIn", () => {
  it("renders SignIn component", () => {
    const onSignInSuccess = jest.fn();
    render(<SignIn onSignInSuccess={onSignInSuccess} />);
    expect(
      screen.getByRole("heading", { name: "Sign In" })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute(
      "type",
      "email"
    );
    expect(screen.getByLabelText(/password/i)).toHaveAttribute(
      "type",
      "password"
    );
    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
  });
});
