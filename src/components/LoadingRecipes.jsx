import React from "react";
import { Grid, Box, Divider, Skeleton, Card, Container } from "@mui/material";

function LoadingRecipes({ postsperpage }) {
  return (
    <Container xs={12}>
      <Grid container sx={{ marginTop: "30px", rowGap: "10px" }}>
        {Array(postsperpage)
          .fill({})
          .map(() => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card
                  style={{
                    minWidth: "200px",
                    minHeight: "200px",
                    width: "250px",
                    height: "350px",
                    border: "1px solid #eee",
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Skeleton
                      variant="circular"
                      //   width={200}
                      //   height={200}
                      sx={{
                        minWidth: "200px",
                        minHeight: "200px",
                        width: "200px",
                      }}
                    ></Skeleton>
                  </Box>
                  <Skeleton
                    variant="rectangular"
                    sx={{ mt: "2px", height: "50px" }}
                  ></Skeleton>
                  <Divider variant="middle" />
                  <Box
                    sx={{
                      display: "flex",
                      marginTop: "3px",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingTop: "1px",
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      width="90px"
                      height="30px"
                    />
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ margin: "0px 5px" }}
                    />
                    <Skeleton
                      variant="rectangular"
                      width="90px"
                      height="30px"
                    />
                  </Box>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
}

export default LoadingRecipes;
