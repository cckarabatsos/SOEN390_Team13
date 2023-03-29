import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ForwardedSearchBar from "../components/SearchBar";

describe("SearchBar", () => {
  test("renders the SearchBar component", () => {
    const { getByPlaceholderText } = render(<ForwardedSearchBar />);
    const searchInput = getByPlaceholderText("SearchText");
    expect(searchInput).toBeInTheDocument();
  });

  test("calls onSearchBtnClick when the search button is clicked", () => {
    const onSearchBtnClick = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <ForwardedSearchBar onSearchBtnClick={onSearchBtnClick} />
    );
    const searchInput = getByPlaceholderText("SearchText");
    const searchButton = getByText("SearchText");
    const searchValue = "Test search value";
    fireEvent.change(searchInput, { target: { value: searchValue } });
    fireEvent.click(searchButton);
    expect(onSearchBtnClick).toHaveBeenCalledWith(searchValue);
  });

  test("returns the correct input value using the ref", () => {
    const { getByPlaceholderText } = render(<ForwardedSearchBar />);
    const searchInput = getByPlaceholderText("SearchText");
    const searchValue = "Test search value";
    fireEvent.change(searchInput, { target: { value: searchValue } });
    const inputValue =
      searchInput.parentElement.parentElement.parentElement.parentElement.querySelector(
        "input"
      ).value;
    expect(inputValue).toEqual(searchValue);
  });
});
