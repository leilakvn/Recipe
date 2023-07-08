import React from "react";
const NutritionContext = React.createContext(null);
const useNutrition = () => React.useContext(NutritionContext);

const nutritions = {
  diet: {
    // vegetarian: false,
    // vegan: false,
    // pale1o: false,
    "high-fiber": false,
    "high-protein": false,
    "low-carb": false,
    "low-fat": false,
    "low-sodium": false,
    "low-sugar": false,
    balanced: false,
    immunity: false,
  },
  health: {
    vegetarian: false,
    vegan: false,
    "alcohol-free": false,
  },
};

export { NutritionContext, useNutrition, nutritions };
