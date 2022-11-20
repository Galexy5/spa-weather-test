import React, { useState } from "react";
import InputBase from "@mui/material/InputBase";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { geoCodingService } from "../services/weather";
import styled from "@emotion/styled";

const SearchWrapper = styled.div`
  display: flex;
  width: 500px;
`;

const SearchBar = styled(InputBase)`
  border: 1px solid;
  border-radius: 5px;
  margin-right: 5px;
  padding-top: 3px;
  width: 400px;
`;

export default function Search({ setCities, setErrorMessage }) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    geoCodingService(searchInput).then(({ data }) => {
      if (data.length === 0) {
        setErrorMessage("No data found, please try another city");
      } else {
        setCities(data);
      }
    });
  };

  const handleSearchInputChange = (e) => {
    setCities([]);
    setErrorMessage("");
    setSearchInput(e.target.value);
  };
  return (
    <SearchWrapper>
      <SearchBar
        type="search"
        placeholder="Search city"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        value={searchInput}
        onChange={handleSearchInputChange}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </SearchWrapper>
  );
}
