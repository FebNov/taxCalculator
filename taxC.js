const TAX_Table_2019 = [
  {
    min_Income: 0,
    max_Income: 18200,
    base: 0,
    rate: 0,
    message: "Na",
  },
  {
    min_Income: 18200,
    max_Income: 37000,
    base: 0,
    rate: 0.19,
    message: "19c for each $1 over $18,200",
  },
  {
    min_Income: 37000,
    max_Income: 90000,
    base: 3572,
    rate: 0.325,
    message: "$3,572 plus 32.5% of amounts over $37,000",
  },
  {
    min_Income: 90000,
    max_Income: 180000,
    base: 20797,
    rate: 0.37,
    message: "$20,797 plus 37% of amounts over $90,000",
  },
  {
    min_Income: 180000,
    max_Income: Infinity,
    base: 54096,
    rate: 0.45,
    message: "54,096 plus 45% of amounts over $180,000",
  },
];
//input index of table
const getTaxConfig = (index, table) => {
  const taxConfig = table[index];
  const { min_Income, base, rate, message } = taxConfig;
  return { min_Income, base, rate, message };
};

function calculateTax(income, taxTable) {
  // Get Tax Config
  const getTaxConfigInRange = (config) =>
    income > config.min_Income && income <= config.max_Income;
  const taxConfigIndex = taxTable.findIndex(getTaxConfigInRange);

  //Validate Fail Fast
  if (taxConfigIndex === -1) {
    throw new Error("UnRange");
  }

  //Get Config
  const { min_Income, base, rate, message } = getTaxConfig(
    taxConfigIndex,
    taxTable
  );

  //Calculatating
  const taxPayable = (income - min_Income) * rate + base;

  //Combine Data
  return { taxPayable, message, rate };
}

const result = calculateTax(200000, TAX_Table_2019);
console.log(result);
