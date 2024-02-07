import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function SortArticles({ searchParams, setSearchParams }) {
  function setSortOrder(value) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", value);
    setSearchParams(newParams);
  }

  function setSortBy(value) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", value);
    setSearchParams(newParams);
  }

  return (
    <div style={{ display: "flex" }}>
      <Box sx={{ minWidth: 130 }}>
        <FormControl fullWidth>
          <InputLabel id="sort-by">Sort By:</InputLabel>
          <Select
            labelId="sort-by-label"
            id="sort-by-select"
            value={searchParams.get("sort_by") || ""}
            label="sortBy"
          >
            <MenuItem
              onClick={() => setSortBy("created_at")}
              value={"created_at"}
            >
              Date
            </MenuItem>
            <MenuItem
              onClick={() => setSortBy("comment_count")}
              value={"comment_count"}
            >
              Comment Count
            </MenuItem>
            <MenuItem onClick={() => setSortBy("votes")} value={"votes"}>
              Votes
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 130 }}>
        <FormControl fullWidth>
          <InputLabel id="select-order">Order By:</InputLabel>
          <Select
            labelId="select-order-label"
            id="select-order"
            value={searchParams.get("order") || ""}
            label="Order"
          >
            <MenuItem onClick={() => setSortOrder("desc")} value={"desc"}>
              Descending
            </MenuItem>
            <MenuItem onClick={() => setSortOrder("asc")} value={"asc"}>
              Ascending
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
export default SortArticles;
