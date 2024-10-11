export const calculateColumn = (width: number) => {
  if (width > 1600) return 4;
  if (width > 1100) return 3;
  if (width > 780) return 2;
  return 1;
};
