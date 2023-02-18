import { Pagination } from "@mui/material";
import React, { useState, useEffect } from "react";
import SearchResultCard from "./SearchResultCard";

const SearchResultPagination = ({ searchResults, resultsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);

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
      {searchResults.length > resultsPerPage && (
        <Pagination
          count={Math.ceil(searchResults.length / resultsPerPage)}
          page={currentPage}
          onChange={(event, newPage) => handlePageChange(newPage)}
        />
      )}
    </>
  );
};

export default SearchResultPagination;
