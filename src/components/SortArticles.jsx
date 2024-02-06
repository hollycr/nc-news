import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useSearchParams } from "react-router-dom";
import { useState } from "react";

function SortArticles({ setSortBy, sortBy }) {
  //let [searchParams, setSearchParams] = useSearchParams();
  // const [sortBy, setSortBy] = useState("");

  function handleChange(event) {
    event.preventDefault();
    // create a params object from the form fields to make up the query
    // setSearchParams(params)
    setSortBy(event.target.value);
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort By:</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortBy}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={"date"}>Date</MenuItem>
          <MenuItem value={"comment_count"}>Comment Count</MenuItem>
          <MenuItem value={"votes"}>Votes</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
export default SortArticles;

/* 

sort by date
sort by comment count
sort by votes
flip the order between ascending and descending 

*/
