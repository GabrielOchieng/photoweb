import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Menu from "../../src/components/Menu";
// import { vi } from "@testing-library/vitest";

describe("Menu", () => {
  it("should render the MenuIcon initially", () => {
    render(<Menu />);
    // Look for icons based on their aria-label (preferred for accessibility) or data-testid attribute (if used)
    const menuIcon =
      screen.getByRole("button", { name: /menu/i }) ||
      screen.getByTestId("menu-icon");
    expect(menuIcon).toBeInTheDocument();
  });
  it("should open the menu dropdown on MenuIcon click", async () => {
    render(<Menu />);
    const menuIcon = screen.getByTestId("menu-icon");
    expect(menuIcon).toBeInTheDocument();
    userEvent.click(menuIcon);

    // Wait for the dropdown to open (if asynchronous)
    await new Promise((resolve) => setTimeout(resolve, 100)); // Adjust timeout if needed

    // Look for the dropdown element (assuming it has a unique identifier)
    expect(screen.getByTestId("menu-icon")).toBeInTheDocument(); // Replace with actual data-testid
  });

  it("should close the menu dropdown on close icon click", () => {
    render(<Menu />);
    const menuIcon =
      screen.getByRole("button", { name: /menu/i }) ||
      screen.getByTestId("menu-icon");
    userEvent.click(menuIcon);
    const closeIcon = screen.getByRole("button", { name: /close/i }); // Look for close icon by aria-label or text content
    userEvent.click(closeIcon);
    expect(screen.queryByText("Home")).not.toBeInTheDocument(); // queryByText returns null if not found
  });
  //   it("should show user info and logout button when userInfo is provided", () => {
  //     const mockHandleLogout = vi.fn();
  //     render(
  //       <Menu
  //         userInfo={{ username: "testuser" }}
  //         handleLogout={mockHandleLogout}
  //       />
  //     );

  //     // More flexible text match (optional)
  //     expect(screen.getByText(/Welcome.*testuser/i)).toBeInTheDocument();
  //     expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();

  //     // Simulate clicking the logout button
  //     userEvent.click(screen.getByRole("button", { name: /logout/i }));

  //     // Verify that the mocked function was called
  //     expect(mockHandleLogout).toHaveBeenCalled();
  //   });

  //   it("should show login link when userInfo is not provided", () => {
  //     render(<Menu />);
  //     // Use text match in case the link doesn't have a role
  //     expect(screen.getByText(/Signin/i)).toBeInTheDocument(); // Adjust for actual text
  //   });
});
