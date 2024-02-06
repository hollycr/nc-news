import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useSearchParams } from "react-router-dom";
import { useState } from "react";

function SortArticles({ searchParams, setSearchParams }) {
  function handleSort(event) {
    event.preventDefault();
    const params = { sortBy: event.target.value, order: searchParams.order };
    setSearchParams(params);
  }

  function handleOrder(event) {
    event.preventDefault();
    const params = { sortBy: searchParams.sortBy, order: event.target.value };
    setSearchParams(params);
  }

  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sort By:</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={searchParams.sortBy}
            label="sortBy"
            onChange={handleSort}
          >
            <MenuItem value={"created_at"}>Date</MenuItem>
            <MenuItem value={"comment_count"}>Comment Count</MenuItem>
            <MenuItem value={"votes"}>Votes</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="select-order">Order By:</InputLabel>
          <Select
            labelId="select-order-label"
            id="select-order"
            value={searchParams.order}
            label="Order"
            onChange={handleOrder}
          >
            <MenuItem value={"desc"}>Descending</MenuItem>
            <MenuItem value={"asc"}>Ascending</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
export default SortArticles;

/* 

sort by date
sort by comment count
sort by votes
flip the order between ascending and descending 

*/
