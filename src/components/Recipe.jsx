import React from "react";
import { Box, Card, Divider, Typography } from "@mui/material";

const Reciepe = ({ title, image, calories, ingredients }) => {
  return (
    <Card
      style={{
        minWidth: "200px",
        minHeight: "200px",
        width: "250px",
        height: "350px",
        border: "1px solid #eee",
      }}
    >
      <img
        src={image}
        style={{ minWidth: "200px", minHeight: "200px", width: "250px" }}
      ></img>
      <Typography sx={{ height: "50px" }}>{title}</Typography>
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
        <Typography>{Math.round(calories)} calories</Typography>
        <Divider orientation="vertical" flexItem sx={{ margin: "0px 5px" }} />
        <Typography> {ingredients} ingredients</Typography>
      </Box>
    </Card>
  );
};

export default Reciepe;
