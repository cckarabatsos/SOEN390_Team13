import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import UserNetworking from "../pages/UserNetworking";

const server = setupServer(
  rest.get("/users", (req, res, ctx) => {
    const searchParam = req.url.searchParams.get("search");
    if (searchParam === "test search") {
      return res(
        ctx.json([
          { name: "result 1" },
          { name: "result 2" },
          { name: "result 3" },
        ])
      );
    }
    return res(ctx.json({ success: false }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("UserNetworking", () => {
  it("displays search results when search succeeds", async () => {
    render(<UserNetworking />);
    const searchInput = screen.getByPlaceholderText(/search/i);
    const searchButton = screen.getByRole("button", { name: /search/i });

    fireEvent.change(searchInput, { target: { value: "test search" } });
    fireEvent.click(searchButton);

    const searchResult1 = await screen.findByText(/result 1/i);
    const searchResult2 = screen.getByText(/result 2/i);
    const searchResult3 = screen.getByText(/result 3/i);

    expect(searchResult1).toBeInTheDocument();
    expect(searchResult2).toBeInTheDocument();
    expect(searchResult3).toBeInTheDocument();
  });

  it("displays error message when search fails", async () => {
    render(<UserNetworking />);
    const searchInput = screen.getByPlaceholderText(/search/i);
    const searchButton = screen.getByRole("button", { name: /search/i });

    fireEvent.change(searchInput, { target: { value: "invalid search" } });
    fireEvent.click(searchButton);

    const errorMessage = await screen.findByText(/search failed/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
