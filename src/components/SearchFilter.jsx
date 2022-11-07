import React, { useCallback } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import { useState, useEffect, useRef, useContext } from "react";
import { filterData, getFilterValues } from "../utils/filterData";
import { useSearchParams, useLocation, useRoutes } from "react-router-dom";
import { NutritionContext, nutritions } from "../contexts/NutritionContext";

function SearchFilter({ setReciepes, baseUrl }) {
  //const location = useLocation();

  const { diet, setDiet } = useContext(NutritionContext);
  const [defaultdiet] = useState(nutritions.diet);
  const [searchTerm, setSearchTerm] = useSearchParams();

  //const [maxCalory, setMaxCalory] = useState();
  //const [filters] = useState(filterData);

  const onSearchChange = (e) => {
    // console.log(diet.vegeterian);
    console.log(e);
    // console.log(e.target.name, e.target.value);
    const filtervalues = getFilterValues({ [e.target.name]: [e.target.value] });
    console.log(filtervalues);
    console.log(e.checked);
    filtervalues.forEach((item) => {
      if (item.name === e.target.name) {
        searchTerm.set(item.name, e.target.value); //history ra az bein nemibare
        setSearchTerm(searchTerm);
        const params = Object.fromEntries([...searchTerm]);
        console.log("Mounted:", params);
      }
    });
  };
  // useEffect(() => {}, [searchTerm]);

  const handelCheckbox = (e) => {
    console.log(diet);
    const item = e.target.id;
    const isChecked = e.target.checked;
    let isDiet = searchTerm.get(e.target.name);
    if (isChecked && isDiet !== null) {
      searchTerm.append(e.target.name, item);
      setSearchTerm(searchTerm);
    } else {
      if (isDiet === null) {
        searchTerm.set(e.target.name, item);
        setSearchTerm(searchTerm);
      } else {
        //pak kardane yek checkbox
        const allPArams = searchTerm.getAll(e.target.name);
        let allPArams2 = allPArams.filter((v) => v !== e.target.id);
        searchTerm.delete(e.target.name); //hameye dite ha ra pak mikone
        allPArams2.map((item) => {
          searchTerm.append(e.target.name, item);
          setSearchTerm(searchTerm);
        });
      }
    }
    setDiet({
      ...diet, //copy the old diet
      [item]: isChecked, //override this one
    });
    console.log(diet);
  };

  const [loading, setLoading] = useState(true);

  const searchRecipe = (e) => {
    // e.stopPropagation();
    console.log("**");
    if (
      searchTerm.get("minCalory") != null &&
      searchTerm.get("maxCalory") != null
    ) {
      searchTerm.set(
        "calories",
        `${searchTerm.get("minCalory")}-${searchTerm.get("maxCalory")}`
      );
      searchTerm.delete("maxCalory");
      searchTerm.delete("minCalory");
    }
    fetchData();
    setSearchTerm([]); //pak kardane searchparam
    console.log(defaultdiet);
    setDiet(defaultdiet);
  };
  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(`${baseUrl}&${searchTerm}`);
    const data = await response.json();
    setReciepes(data.hits);
    console.log(data.hits);
    console.log(`${baseUrl}&${searchTerm}`);

    setLoading(false);
  };

  return (
    <>
      <Grid
        container
        // sx={{ bgcolor: "white", color: "black", m: 0, p: 0 }}
      >
        <Grid item xs={12}>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} md={4}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography fontWeight="bold" fontSize="medium">
                    Calaries
                  </Typography>
                </Grid>
                <Grid item xs={12} paddingTop="15px">
                  <Grid
                    item
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                  >
                    <Typography fontSize="small">From</Typography>
                    <TextField
                      size="small"
                      id="outlined-basic"
                      name="minCalory"
                      variant="outlined"
                      defaultValue={searchTerm.get("minCalory")}
                      onChange={onSearchChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Grid
                      item
                      display="flex"
                      gap={2}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography fontSize="small">To</Typography>
                      <TextField
                        size="small"
                        id="outlined-basic"
                        variant="outlined"
                        name="maxCalory"
                        defaultValue={searchTerm.get("maxCalory")}
                        onChange={onSearchChange}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography fontWeight="bold" fontSize="medium">
                      Ingredients
                    </Typography>
                    <Grid
                      item
                      xs={12}
                      display="flex"
                      gap={2}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography fontSize="small">up to</Typography>
                      <TextField
                        size="small"
                        id="outlined-basic"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography fontWeight="bold" fontSize="medium">
                Diet
              </Typography>
              <Grid container columnSpacing={1}>
                <Grid item xs={12} md={6}>
                  <FormGroup>
                    {Object.keys(diet)
                      .slice(0, 6)
                      .map((key, index) => (
                        <FormControlLabel
                          key={index}
                          control={
                            <Checkbox
                              sx={{ paddingRight: 0 }}
                              name="diet"
                              id={key}
                              onChange={handelCheckbox}
                              checked={diet[key]}
                            />
                          }
                          label={key}
                        />
                      ))}
                  </FormGroup>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormGroup>
                    {Object.keys(diet)
                      .slice(6, 12)
                      .map((key, index) => (
                        <FormControlLabel
                          key={index}
                          control={
                            <Checkbox
                              sx={{ paddingRight: 0 }}
                              name="diet"
                              id={key}
                              onChange={handelCheckbox}
                              checked={diet[key]}

                              //  checked={diet.[item]}
                            />
                          }
                          label={key}
                        />
                      ))}
                  </FormGroup>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography fontWeight="bold" fontSize="medium">
                Alergies
              </Typography>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox sx={{ paddingRight: 0 }} />}
                      label="Gluten"
                    />
                    <FormControlLabel
                      control={<Checkbox sx={{ paddingRight: 0 }} />}
                      label="egg"
                    />
                    <FormControlLabel
                      control={<Checkbox sx={{ paddingRight: 0 }} />}
                      label="Dairy"
                    />
                    <FormControlLabel
                      control={<Checkbox sx={{ paddingRight: 0 }} />}
                      label="Soy"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox sx={{ paddingRight: 0 }} />}
                      label="fish"
                    />
                    <FormControlLabel
                      control={<Checkbox sx={{ paddingRight: 0 }} />}
                      label="shelfish"
                    />
                    <FormControlLabel
                      control={<Checkbox sx={{ paddingRight: 0 }} />}
                      label="treenut"
                    />
                    <FormControlLabel
                      control={<Checkbox sx={{ paddingRight: 0 }} />}
                      label="peanut"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid textAlign="right" paddingBottom={1} item xs={12}>
          <button variant="contained" onClick={(e) => searchRecipe(e)}>
            search
          </button>
        </Grid>
      </Grid>
    </>
  );
}
export default SearchFilter;
