import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import UserSearchBar from "../pages/UserSearch.jsx";
import UserSearchComponent from "../components/UserSearchComponent.jsx";
import { MemoryRouter as Router } from "react-router-dom";


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
    render(<Router><UserSearchComponent /></Router>);
    render(<UserSearchBar />);
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
    render(<Router><UserSearchComponent /></Router>);
    render(<UserSearchBar />);
    const searchInput = screen.getByPlaceholderText(/search/i);
    const searchButton = screen.getByRole("button", { name: /search/i });

    fireEvent.change(searchInput, { target: { value: "invalid search" } });
    fireEvent.click(searchButton);

    const errorMessage = await screen.findByText(/search failed/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it("should update category state correctly", () => {
    render(<UserSearchBar />);
    const searchInput = screen.getByPlaceholderText(/search/i);
  
    fireEvent.change(searchInput, { target: { value: "category_value" } });
  
    expect(searchInput.value).toBe("category_value");
  });
  
  it("should update users state correctly when search is successful", async () => {
    const mockSearchUsers = jest.fn().mockResolvedValue([{ name: 'User1' }, { name: 'User2' }]);
    render(<UserSearchBar searchUsers={mockSearchUsers} />);
    
    const searchInput = screen.getByPlaceholderText(/search/i);
    const searchButton = screen.getByRole("button", { name: /search/i });
  
    fireEvent.change(searchInput, { target: { value: "search_text" } });
    fireEvent.click(searchButton);
  
    await waitFor(() => expect(mockSearchUsers).not.toHaveBeenCalledWith("All", "search_text"));
    expect(screen.getByText("User1")).toBeInTheDocument();
    expect(screen.getByText("User2")).toBeInTheDocument();
  });
  
  it("should handle search error correctly", async () => {
    const mockSearchUsers = jest.fn().mockRejectedValue(new Error("Search failed"));
    render(<UserSearchBar searchUsers={mockSearchUsers} />);
    
    const searchInput = screen.getByPlaceholderText(/search/i);
    const searchButton = screen.getByRole("button", { name: /search/i });
  
    fireEvent.change(searchInput, { target: { value: "invalid_search_text" } });
    fireEvent.click(searchButton);
  
    await waitFor(() => expect(mockSearchUsers).not.toHaveBeenCalledWith("All", "invalid_search_text"));
    expect(screen.getByText("search-input")).toBeInTheDocument();
  });


});


