import { render, screen, fireEvent } from "@testing-library/react";
import SearchResultCard from "../components/SearchResultCard";
import SearchResultPagination from "../components/SearchResultPagination";

const testSearchResults = [
  {
    imageUrl: "test-image-1.jpg",
    name: "John Doe",
    workPosition: "Software Engineer",
    address: "123 Main St, Anytown USA",
    connections: "100+",
  },
  {
    imageUrl: "test-image-2.jpg",
    name: "Jane Smith",
    workPosition: "Product Manager",
    address: "456 Oak St, Anytown USA",
    connections: "500+",
  },
];

describe("SearchResultPagination component", () => {
  it('should display "No search results found" message when no results are passed in', () => {
    render(<SearchResultPagination searchResults={[]} />);
    expect(screen.getByText("No search results found")).toBeInTheDocument();
  });

  it('should display the correct number of SearchResultCard components based on the "resultsPerPage" prop', () => {
    render(
      <SearchResultPagination
        searchResults={testSearchResults}
        resultsPerPage={1}
      />
    );
    expect(screen.getAllByTestId("search-result-card")).toHaveLength(1);
  });

  it('should display Pagination component when there are more results than "resultsPerPage"', () => {
    const resultsPerPage = 1;
    const totalResults = 2;
    render(
      <SearchResultPagination
        searchResults={testSearchResults}
        resultsPerPage={resultsPerPage}
        totalResults={totalResults}
      />
    );
    const paginationElement = screen.getByTestId("pagination");
    expect(paginationElement).toBeInTheDocument();
  });

  it("should update the displayed SearchResultCard components when changing pages in the Pagination component", () => {
    render(
      <SearchResultPagination
        searchResults={testSearchResults}
        resultsPerPage={1}
      />
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("2"));

    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });
});

describe("SearchResultCard component", () => {
  const testResult = {
    imageUrl: "test-image.jpg",
    name: "John Doe",
    workPosition: "Software Engineer",
    address: "123 Main St, Anytown USA",
    connections: "100+",
  };

  it("should display the correct data passed in through props", () => {
    render(<SearchResultCard data={testResult} />);
    expect(screen.getByAltText("Profile Picture")).toHaveAttribute(
      "src",
      "test-image.jpg"
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(
      screen.getByText("Work Position: Software Engineer")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Address: 123 Main St, Anytown USA")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Connections (like LinkedIn): 100+")
    ).toBeInTheDocument();
  });
});
