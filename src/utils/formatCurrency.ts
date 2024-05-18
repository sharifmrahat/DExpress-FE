const formatCurrency = (number: number, currency: string = "$") => {
  const formattedNumber = number.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });
  return `${currency} ${formattedNumber}`;
};

export default formatCurrency;
