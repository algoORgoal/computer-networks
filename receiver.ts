import { countOnes, getParityBit } from "./frame";

const isFrameValid = (payload: string, receivedParityBit: string): boolean => {
  const numberOfOnes = countOnes(payload);
  const calculatedParityBit = getParityBit(numberOfOnes);

  if (calculatedParityBit === receivedParityBit) {
    return true;
  }
  return false;
};

console.log(isFrameValid("10101", "1")); // false
console.log(isFrameValid("10101", "0")); // true
