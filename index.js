  ////////////////////////////////
 //// Gross Potential Income ////
////////////////////////////////

const annualGrossPotentialIncome = (expectedMonthlyRentIncome) => {
  return (12 * expectedMonthlyRentIncome)
}

//EXAMPLE FOR ANUAL GROSS POTENTIAL INCOME
// annualGrossPotentialIncome(34000)



  ////////////////////////////////
 //// Net Operating Income ////
////////////////////////////////

///////**** Methodology ****//////
// Gross Potential Income
// subtracted by Vacancy and
// Credit Losses
const netOperatingIncome = function({
  monthlyIncome,
  vacancies,
  nonPayments,
  taxes,
  mortgageInterest,
  marketing,
  advertising,
  management,
  legal,
  accounting,
  utilities,
  repairs,
  maintenance,
  acquisition,
  sale_costs
}){
  let args = Object.values(arguments);
  let gpi = annualGrossPotentialIncome(args[0]);
  let totalExpenses = args.slice(1, args.length -1).reduce((a, b) => a + b, 0);
  let result = gpi - totalExpenses;
  return result;
}

//EXAMPLE
// netOperatingIncome(
//   34000,
//   850,
//   850,
//   100,
//   2000,
//   200,
//   100,
//   20000,
//   2000,
//   30000,
//   100,
//   200,
//   3000,
//   100000,
//   500000);




  //////////////////////////////////
 ///// Gross Rental Multiplier ////
//////////////////////////////////

///////**** Methodology ****//////
// divide market value by
// annual gross potential income

const grossRentalMultiplier = function({
  marketValue,
  agi
}){
  let args = Object.values(arguments);
  return ((args[0]/args[1]).toFixed(3));
};

//EXAMPLE OF GRM CALCULATOR
// grossRentalMultiplier(543000, annualGrossPotentialIncome(340000));




   //////////////////////////////////
  //// Estimated Property Value ////
 ////          (GRM)           ////
//////////////////////////////////

///////**** Methodology ****//////
// Gross Rent Multiplier
// multiplied by Annual Income
// Note: Not the Gross Annual
// Income

const estimatedPropertyValueByGRM = function({
  grm,
  annualIncome
}){
  let args = Object.values(arguments);
  return args[0] * args[1];
}


//EXAMPLE OF ESTIMATED PROPERTY VALUE BY GRM CALCULATOR
// estimatedPropertyValueByGRM(grossRentalMultiplier(543000, annualGrossPotentialIncome(34000)), 340000)


  ////////////////////////////////
 //// Gross Operating Income ////
////////////////////////////////

///////**** Methodology ****//////
// Gross Potential Income
// subtracted by Vacancies and
// Non-Payments


const grossOperatingIncome = function({
  monthlyIncome,
  estimatedLossPercentage
}){
  let args = Object.values(arguments);
  let agi = annualGrossPotentialIncome(args[0]);
  let estimatedLoss = agi * (args[1] / 100).toFixed(2);
  return (agi - estimatedLoss);
}

//EXAMPLE OF GROSS OPERATING INCOME
// grossOperatingIncome(34000, 5);



  ////////////////////////////////
 /////  Capitalization Rate /////
////////////////////////////////

///////**** Methodology ****//////
// Gross Potential Income
// subtracted by Vacancy and
// Credit Losses (except mortage)
// all divided by sale price

const capitalizationRate = function({
  monthlyIncome,
  vacancies,
  nonPayments,
  taxes,
  marketing,
  advertising,
  management,
  legal,
  accouting,
  utilities,
  repairs,
  maintenance,
  acquisition,
  sale_costs,
  sale_earned
}){
  let args = Object.values(arguments);
  let gpi = annualGrossPotentialIncome(args[0]);
  let totalExpenses = args.slice(1, args.length -2).reduce((a, b) => a + b, 0);
  let noi = (gpi - totalExpenses);
  let result = (noi / args[args.length -1]).toFixed(3);
  return result;
}


//EXAMPLE FOR CAP RATE
// capitalizationRate(
//   34000,
//   850,
//   850,
//   100,
//   200,
//   100,
//   20000,
//   2000,
//   30000,
//   100,
//   200,
//   3000,
//   100000,
//   500000);





   //////////////////////////////////
  //// Estimated Property Value ////
 /////       (Cap Rate)       /////
//////////////////////////////////

///////**** Methodology ****//////
// Gross Rent Multiplier
// multiplied by Annual Income
// Note: Not the Gross Annual
// Income

const estimatedPropertyValueByCapRate = function({
  noi,
  capRate
}){
  let args = Object.values(arguments);
  return (args[0]/args[1]).toFixed(2);
}


//EXAMPLE OF ESTIMATED PROPERTY
//VALUE BY CAP RATE

// estimatedPropertyValueByCapRate(
  // netOperatingIncome(
  // 34000,
  // 850,
  // 850,
  // 100,
  // 2000,
  // 200,
  // 100,
  // 20000,
  // 2000,
  // 30000,
  // 100,
  // 200,
  // 3000,
  // 100000,
  // 30000),
//   capitalizationRate(
//   34000,
//   850,
//   850,
//   100,
//   200,
//   100,
//   20000,
//   2000,
//   30000,
//   100,
//   200,
//   3000,
//   100000,
//   30000,
//   500000)
// )




  //////////////////////////////////
 //// Cash Flow Before Taxes   ////
//////////////////////////////////

///////**** Methodology ****//////
// Net Operating Income subtracted
// by Debt Service (mortgage interest
// and principle) subtracted by
// all capital expenditures
// subtracted by all loans
// taken for capital expenditures
// plus all interest earned/generated
// from the subject property



const cashFlowBeforeTaxes = function({
  noi,
  interestRate,
  loanPrinciple,
  capitalExpenditures,
  capitalExpenditureLoans,
  earnedInterest
}){
  let args = Object.values(arguments);
  return (args[0] - (((args[1] / 100) * args[2]).toFixed(2) + args[2] + args[3])).toFixed(2) - args[4] + args[5];
}


//EXAMPLE FOR CASHFLOW BEFORE TAXES
// cashFlowBeforeTaxes(
//   netOperatingIncome(
//     34000,
//     850,
//     850,
//     100,
//     2000,
//     200,
//     100,
//     20000,
//     2000,
//     30000,
//     100,
//     200,
//     3000,
//     100000,
//     30000
//   ),
//   10,
//   540000,
//   20000,
//   3000,
//   15000
// );






  //////////////////////////////////
 //// Cash Flow After Taxes    ////
//////////////////////////////////

///////**** Methodology ****//////
// Cash Flow Before Taxes subtracted
// by income tax (State and Federal)


const cashFlowAfterTaxes = function({
  cfbt,
  stateIncomeTax,
  federalIncomeTax
}){
  let args = Object.values(arguments);
  return args[0] - (args[1] + args[2]).toFixed(2);
};


// cashFlowAfterTaxes(
//   cashFlowBeforeTaxes(
//     netOperatingIncome(
//       34000,
//       850,
//       850,
//       100,
//       2000,
//       200,
//       100,
//       20000,
//       2000,
//       30000,
//       100,
//       200,
//       3000,
//       100000,
//       30000
//     ),
//     10,
//     540000,
//     20000,
//     3000,
//     15000
//   ),
//   -45000,
//   12000
// );




  ////////////////////////////////
 /////   Break Even Ratio   /////
////////////////////////////////


///////**** Methodology ****//////
// Debt Service plus
// Annual Operating Expenses
// divided by Gross Operating
// Income

const breakEvenRatio = function({
  interestRate,
  loanPrinciple,
  marketing,
  advertising,
  management,
  legal,
  accounting,
  utilities,
  repairs,
  maintenance,
  goi
}){
  let args = Object.values(arguments);
  let debtService = ((args[0] / 100) * args[1] + args[1]);
  let operatingExpenses = args.slice(2, args.length - 2).reduce((acc, sum) => acc + sum, 0)
  let expenses = ((debtService) + operatingExpenses);
  let result = (expenses / args[args.length - 1]).toFixed(2);
  return result;
};


//EXAMPLE OF BREAK EVEN RATIO
// breakEvenRatio(
//   10,
//   20000,
//   1000,
//   500,
//   15000,
//   3500,
//   28000,
//   3200,
//   8000,
//   1500,
//   grossOperatingIncome(34000, 5)
// );




  ////////////////////////////////
 /////   Return On Equity   /////
////////////////////////////////


///////**** Methodology ****//////
// Cash Flow After Taxes
// divided by Principle
// Invested on subject property

const returnOnEquity = function({
  cfat,
  principleInvested
}){
  let args = Object.values(arguments);
  let result = (args[0] / args[1]).toFixed(2);
  return result;
};



//EXAMPLE FOR RETURN ON EQUITY

// returnOnEquity(
//   cashFlowAfterTaxes(
//     cashFlowBeforeTaxes(
//       netOperatingIncome(
//         34000,
//         850,
//         850,
//         100,
//         2000,
//         200,
//         100,
//         20000,
//         2000,
//         30000,
//         100,
//         200,
//         3000,
//         100000,
//         30000
//       ),
//       10,
//       540000,
//       20000,
//       3000,
//       15000
//     ),
//     -45000,
//     12000
//   ),
//   6500000
// );




module.exports = {
  annualGrossPotentialIncome,
  netOperatingIncome,
  grossRentalMultiplier,
  estimatedPropertyValueByGRM,
  grossOperatingIncome,
  capitalizationRate,
  estimatedPropertyValueByCapRate,
  cashFlowBeforeTaxes,
  cashFlowAfterTaxes,
  breakEvenRatio,
  returnOnEquity
}
