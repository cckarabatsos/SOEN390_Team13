import { Pagination } from "@mui/material";
import React, { useState, useEffect } from "react";
import SearchResultCard from "./SearchResultCard";

const TEMP_SEARCH_RESULTS = [
  {
    name: "John Doe",
    position: "Software Engineer",
    address: "123 Main St",
    connections: 10,
  },
  {
    name: "Jane Smith",
    position: "Product Manager",
    address: "456 Market St",
    connections: 20,
  },
  {
    name: "Bob Johnson",
    position: "Sales Associate",
    address: "789 Broadway",
    connections: 5,
  },
  {
    name: "Mary Williams",
    position: "UX Designer",
    address: "246 Elm St",
    connections: 15,
  },
  {
    name: "Alex Lee",
    position: "Data Analyst",
    address: "135 Oak St",
    connections: 25,
  },
  {
    name: "Samantha Brown",
    position: "Marketing Manager",
    address: "789 Main St",
    connections: 8,
  },
];

const SearchResultPagination = ({ resultsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);

  // Load search results on mount
  useEffect(() => {
    setSearchResults(TEMP_SEARCH_RESULTS);
  }, []);

  // Determine the index range for the current page
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;

  // Slice the search results array to show only the current page's results
  const currentResults = searchResults.slice(startIndex, endIndex);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (searchResults.length === 0) {
    return <div>No search results found</div>;
  }

  return (
    <>
      {currentResults.map((result, index) => (
        <SearchResultCard key={index} data={result} />
      ))}
      {searchResults.length > 0 && (
        <Pagination
          count={Math.ceil(searchResults.length / resultsPerPage)}
          page={currentPage}
          onChange={(event, newPage) => handlePageChange(newPage)}
        />
      )}
    </>
  );
};

SearchResultPagination.defaultProps = {
  resultsPerPage: 10,
};

export default SearchResultPagination;
