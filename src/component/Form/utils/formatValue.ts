export const formatValue = (value: string): number | undefined => {
  if (value) {
    return Number(value);
  }
};

export const formatFloatValue = (value: string): number | undefined => {
  if (value) {
    return parseFloat(value);
  }
};
