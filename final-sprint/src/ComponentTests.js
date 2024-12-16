import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Cart from "./Cart";

test("fetches and displays cart items", async () => {
  const mockCartItems = [
    { id: 1, name: "Item 1", price: 10 },
    { id: 2, name: "Item 2", price: 20 },
  ];

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockCartItems),
    })
  );

  render(<Cart />);

  await waitFor(() => {
    expect(screen.getByText("Item 1 - $10")).toBeInTheDocument();
    expect(screen.getByText("Item 2 - $20")).toBeInTheDocument();
  });
});

test("removes item from cart", async () => {
  const mockCartItems = [
    { id: 1, name: "Item 1", price: 10 },
    { id: 2, name: "Item 2", price: 20 },
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
    expect(screen.getByText("Item 1 - $10")).toBeInTheDocument();
    expect(screen.getByText("Item 2 - $20")).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText("Remove", { selector: "button" }));

  await waitFor(() => {
    expect(screen.queryByText("Item 1 - $10")).not.toBeInTheDocument();
  });
});

test("displays total price", async () => {
  const mockCartItems = [
    { id: 1, name: "Item 1", price: 10 },
    { id: 2, name: "Item 2", price: 20 },
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
