export const fillArray = (length, initialValue = 0) => {
  let arrayLength = length - initialValue + 1;
  if (arrayLength < 0) arrayLength = 0;
  return Array(arrayLength)
    .fill()
    .map((item, index) => initialValue + index);
};
