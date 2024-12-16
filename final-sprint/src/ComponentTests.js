import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Cart from "./Cart";

test("fetches and displays cart items", async () => {
  const mockCartItems = [
    { id: 1, name: "Non-Stick Frying Pan", price: 24.99 },
    { id: 2, name: "Wooden Dining Chair", price: 59.99 },
  ];

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockCartItems),
    })
  );

  render(<Cart />);

  await waitFor(() => {
    expect(
      screen.getByText("Non-Stick Frying Pan - $24.99")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Wooden Dining Chair - $59.99")
    ).toBeInTheDocument();
  });
});

test("removes item from cart", async () => {
  const mockCartItems = [
    { id: 1, name: "Non-Stick Frying Pan", price: 24.99 },
    { id: 2, name: "Wooden Dining Chair", price: 59.99 },
  ];

  global.fetch = jest.fn((url, options) => {
    if (options && options.method === "DELETE") {
      return Promise.resolve();
    }
    return Promise.resolve({
      json: () => Promise.resolve(mockCartItems),
    });
  });

  render(<Cart />);

  await waitFor(() => {
    expect(
      screen.getByText("Non-Stick Frying Pan - $24.99")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Wooden Dining Chair - $59.99")
    ).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText("Remove", { selector: "button" }));

  await waitFor(() => {
    expect(
      screen.queryByText("Non-Stick Frying Pan - $24.99")
    ).not.toBeInTheDocument();
  });
});

test("displays total price", async () => {
  const mockCartItems = [
    { id: 1, name: "Non-Stick Frying Pan", price: 24.99 },
    { id: 2, name: "Wooden Dining Chair", price: 59.99 },
  ];

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockCartItems),
    })
  );

  render(<Cart />);

  await waitFor(() => {
    expect(screen.getByText("Total: $30.00")).toBeInTheDocument();
  });
});
