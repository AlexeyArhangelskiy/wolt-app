const ERRORS = {
  NON_ZERO_NUMBER: "Enter a value greater then zero",
  ONLY_FIXED_2_NUMBER: "You can enter only two digits after the decimal point",
  ONLY_POSITIVE_NUMBER: "Value needs to be greater then zero",
  ONLY_WHOLE_NUMBER: "Enter a whole number",
};

export const validateCost = (cost: number | undefined): string | undefined => {
  if (!cost) {
    return ERRORS.NON_ZERO_NUMBER;
  }
  if (cost < 0) {
    return ERRORS.ONLY_POSITIVE_NUMBER;
  }
  const costString = cost.toString();
  const amountReg = /^\d+(\.\d{1,2})?$/;
  return amountReg.test(costString) ? undefined : ERRORS.ONLY_FIXED_2_NUMBER;
};

export const validateNumber = (
  value: number | undefined,
): string | undefined => {
  if (!value) {
    return ERRORS.NON_ZERO_NUMBER;
  }
  if (value < 0) {
    return ERRORS.ONLY_POSITIVE_NUMBER;
  }
  return Number.isInteger(value) ? undefined : ERRORS.ONLY_WHOLE_NUMBER;
};
