import React from "react";
const NutritionContext = React.createContext(null);
const useNutrition = () => React.useContext(NutritionContext);

const nutritions = {
  diet: {
    vegetarian: false,
    vegan: false,
    paleo: false,
    "high-fiber": false,
    "high-protein": false,
    "low-carb": false,
    "low-fat": false,
    "low-sodium": false,
    "low-sugar": false,
    "alcohol-free": false,
    balanced: false,
    immunity: false,
  },
};

export { NutritionContext, useNutrition, nutritions };
