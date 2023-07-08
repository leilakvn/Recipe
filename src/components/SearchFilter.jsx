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

function SearchFilter({ setReciepes, baseUrl, isEmpty,setIsOpen }) {
  //const location = useLocation();

  const [defaultdiet] = useState(nutritions.diet);
  const [defaultHealth] = useState(nutritions.health);
  const { diet, setDiet } = useContext(NutritionContext);
  console.log("diet", diet);
  const { health, setHealth } = useContext(NutritionContext);
  console.log("health", health);

  // console.log("default health", defaultHealth);
  const [searchTerm, setSearchTerm] = useSearchParams();

  //const [maxCalory, setMaxCalory] = useState();
  //const [filters] = useState(filterData);

  const onSearchChange = (e) => {
    // console.log(diet.vegeterian);
    console.log(e);
    // console.log(e.target.name, e.target.value);
    const filtervalues = getFilterValues({ [e.target.name]: [e.target.value] });
    console.log(filtervalues);

    filtervalues.forEach((item) => {
      if (item.name === e.target.name) {
        searchTerm.set(item.name, e.target.value); //history ra az bein nemibare
        setSearchTerm(searchTerm);
        const params = Object.fromEntries([...searchTerm]);
        console.log("Mounted:", params);
      }
    });
  };
  useEffect(() => {
    if (isEmpty === true) {
      baseUrl =
        "https://api.edamam.com/api/recipes/v2?type=public&app_id=4cc7fb27&app_key=1edcada35455f9a572c1c1e79ed9f015";
    }
  }, []);

  const handelCheckbox = (e) => {
    // console.log("diet", diet);
    // console.log("health", health);
    const item = e.target.id;
    const isChecked = e.target.checked;
    let isBefore = searchTerm.get(e.target.name);
    console.log("name:", isBefore);
    // let isHealth = searchTerm.get(e.target.name);
    if (isBefore === null) {
      //ghablan naboode
      console.log("ghablan naboode");
      searchTerm.set(e.target.name, item);
      setSearchTerm(searchTerm);
    }
    if (!isChecked && isBefore !== null) {
      //ghablan boode va check nadare
      //pak kardane yek checkbox
      console.log("ghablan boode va check nadare");
      const allPArams = searchTerm.getAll(e.target.name);
      let allPArams2 = allPArams.filter((v) => v !== e.target.id);
      searchTerm.delete(e.target.name); //hameye dite ha ra pak mikone
      allPArams2.map((item) => {
        searchTerm.append(e.target.name, item);
        setSearchTerm(searchTerm);
      });
    }
    if (isChecked && isBefore !== null) {
      console.log("ghablan boode va check dare");
      searchTerm.append(e.target.name, item);
      setSearchTerm(searchTerm);
    }
    if (e.target.name === "diet")
      setDiet({
        ...diet, //copy the old diet
        [item]: isChecked, //override this one
      });
    if (e.target.name === "health")
      setHealth({
        ...health, //copy the old diet
        [item]: isChecked, //override this one
      });
    console.log("diet", diet);
    console.log("health", health);
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
    // console.log("default health", defaultHealth);
    setDiet(defaultdiet);
    setHealth(defaultHealth);
    setIsOpen(false)

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
                <Grid item xs={12} md={6}>
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
              <Grid container columnSpacing={1}>
                <Grid item xs={12} md={6}>
                  <Typography fontWeight="bold" fontSize="medium">
                    Diet
                  </Typography>
                </Grid>
                <Grid xs={12} md={6}>
                  <Typography fontWeight="bold" fontSize="medium">
                    Health
                  </Typography>
                </Grid>
              </Grid>
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
                    {/* {Object.keys(diet)
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
                      ))} */}
                    {Object.keys(health).map((key, index) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            sx={{ paddingRight: 0 }}
                            name="health"
                            id={key}
                            onChange={handelCheckbox}
                            checked={health[key]}

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
