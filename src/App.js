import {
  Button,
  Grid,
  TextField,
  CircularProgress,
  Tooltip,
  Typography,
  styled,
  Container,
  Tab,
  ClickAwayListener,
} from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { red, purple } from "@mui/material/colors";
import { bgcolor, Box } from "@mui/system";
import { useEffect, useState, useCallback } from "react";
import Reciepe from "./components/Recipe";
import Pagination from "@mui/material/Pagination";
import SearchFilter from "./components/SearchFilter";
import {
  NutritionContext,
  useNutrition,
  nutritions,
} from "./contexts/NutritionContext";
import SearchBar from "./components/SearchBar";
import { SettingsInputComponent } from "@mui/icons-material";
import LoadingRecipes from "./components/LoadingRecipes";
// const BlueOnGreenTooltip = styled(({ className, ...props }) => (
//   <Tooltip {...props} componentsProps={{ tooltip: { className: className } }} />
// ))(`
//     color: lightblue;
//     background-color: green;
//     font-size: 1.5em;
// `);

const App = () => {
  const [reciepes, setReciepes] = useState([]);
  const [isLoading, SetIsLoading] = useState(true);

  const [query, setQuery] = useState("chicken");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = reciepes.slice(indexOfFirstPost, indexOfLastPost);
  const [diet, setDiet] = useState(nutritions.diet);

  const SearchButton = styled(Button)({
    "&:hover": { color: "yellow" },
  });

  const [baseUrl, setBaseUrl] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const getReciepe = async () => {
    setBaseUrl(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=4cc7fb27&app_key=1edcada35455f9a572c1c1e79ed9f015`
    );
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=4cc7fb27&app_key=1edcada35455f9a572c1c1e79ed9f015`
    );
    const data = await response.json();
    setReciepes(data.hits);
    SetIsLoading(true);
    console.log(data);
  };
  useEffect(() => {
    getReciepe();
  }, [query]);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  return (
    <>
      <SearchBar
        setQuery={setQuery}
        setCurrentPage={setCurrentPage}
        query={query}
      ></SearchBar>
      <Box
        textAlign="center"
        alignItems="center"
        sx={{ background: "#fefbe9" }}
      >
        <Tooltip
          componentsProps={{
            tooltip: {
              sx: {
                maxWidth: "800px",
                color: "black",
                backgroundColor: "white",
                fontSize: "2em",
                // width: "800px",
                // border: "1px solid black",
                borderRadius: "10px",
                boxShadow: "2px 3px 3px 3px #eee",
              },
            },
          }}
          open={!isOpen && isHover}
          title={
            <NutritionContext.Provider value={{ diet, setDiet }}>
              <SearchFilter
                baseUrl={baseUrl}
                setReciepes={setReciepes}
                setIsOpen={setIsOpen}
              />
            </NutritionContext.Provider>
          }
        >
          <Tab
            label={"REFINE SEARCH BY Calories, Diet, Ingredients"}
            onClick={() => setIsOpen(!isOpen)}
            onMouseOver={() => setIsHover(true)}
            // onMouseLeave={() => setIsHover(!isHover)}
            sx={{ fontSize: "12px" }}
          >
            <Tab label={"vvv"}></Tab>
          </Tab>

          {/* <ArrowDropDownIcon /> */}
        </Tooltip>

        {reciepes?.length > 0 ? ( //besiar momehem map *********
          <Container xs={12}>
            <Grid container sx={{ marginTop: "30px", rowGap: "10px" }}>
              {currentPosts.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.recipe.url}>
                  <Reciepe
                    key={item.recipe.url}
                    image={item.recipe.image}
                    title={item.recipe.label}
                    calories={item.recipe.calories}
                    ingredients={item.recipe.ingredients.length}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        ) : isLoading === true ? (
          <LoadingRecipes postsperpage={postsPerPage} />
        ) : (
          <Box marginTop="25px">
            <Typography>no Result found...</Typography>
          </Box>
        )}
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
        >
          <Pagination
            count={Math.round(reciepes.length / postsPerPage)}
            page={currentPage}
            variant="outlined"
            color="primary"
            className="pagination"
            onChange={handleChange}
          />
        </Box>
      </Box>
    </>
  );
};

export default App;
