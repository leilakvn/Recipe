export const filterData = [
  {
    items: [
      { name: "Buy", value: "for-sale" },
      { name: "Rent", value: "for-rent" },
    ],
    placeholder: "MAx Calory",
    queryName: "MAxCalory",
  },
  {
    items: [
      { name: "Buy", value: "for-sale" },
      { name: "Rent", value: "for-rent" },
    ],
    placeholder: "Min Calory",
    queryName: "MinCalory",
  },
];
export const getFilterValues = (filterValues) => {
  const { minCalory, maxCalory, Diet } = filterValues;

  const values = [
    {
      name: "minCalory",
      value: minCalory,
    },
    {
      name: "maxCalory",
      value: maxCalory,
    },
    {
      name: "Diet",
      value: Diet,
    },
  ];

  return values;
};
