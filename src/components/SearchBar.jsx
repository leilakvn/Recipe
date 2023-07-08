import { useState, useEffect } from "react";
import { Search } from "@mui/icons-material";
import {
  Box,
  Chip,
  FormControl,
  Hidden,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  styled,
} from "@mui/material";
import React from "react";
const SearchOutlinedInput = styled(OutlinedInput)(() => ({
  // bayad biroonr component bashe
  borderTopRightRadius: "25px",
  borderBottomRightRadius: "25px",
  borderColor: "#f6c453",
  padding: "0px",
  background: "white",
  color: "#183a1d",
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#f6c453",
  },
}));
const SearchLabel = styled(InputLabel)(() => ({
  color: "#183a1d",
  fontWeight: "bold",
  "&.Mui-focused": {
    color: "#f6c453",
  },
}));
function SearchBar({ setQuery, setCurrentPage, query, setIsEmpty }) {
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue(value);
    if (value === "") {
      setIsEmpty(true);
    }
  }, [value]);
  return (
    <Box sx={{ textAlign: "center", background: "#e1eedd" }}>
      <FormControl
        sx={{
          m: 1,
          width: "50%",
          maxWidth: "sm",
          color: "#183a1d",
          fontWeight: "bold",
        }}
      >
        <SearchLabel shrink={false} htmlFor="outlined-adornment-password">
          <Hidden smDown>{value ? "" : "Find the best recipes..."}</Hidden>
          <Hidden smUp>{value ? "" : "Find..."}</Hidden>
        </SearchLabel>
        <SearchOutlinedInput
          // placeholder="search for the recipes..."
          id="outlined-adornment-password"
          autoComplete="off"
          value={value}
          notched={false}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          endAdornment={
            <InputAdornment
              position="end"
              sx={{
                background: "#183a1d",
                width: "15%",
                maxHeight: "54px",
                height: "54px", //bayad bishtar az max height bashe ta kolan por she
                borderTopRightRadius: "25px",
                borderBottomRightRadius: "25px",
                justifyContent: "center",
              }}
            >
              {value !== "" ? (
                <Chip
                  sx={{
                    background: "white",
                    maxHeight: "54px",
                    height: "54px",
                    borderRadius: "0",
                  }}
                  onDelete={() => {
                    setValue("");
                  }}
                ></Chip>
              ) : (
                ""
              )}

              <IconButton
                aria-label="toggle password visibility"
                sx={{ color: "#fff", textAlign: "center", margin: "0px" }}
                size="large"
                edge="end"
                onClick={(e) => {
                  setQuery(value);
                  setCurrentPage(1);
                }}
              >
                <Search />
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
    </Box>
  );
}

export default SearchBar;
