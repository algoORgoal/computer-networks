import { countOnes, getParityBit } from "./frame";

const getFrame = (payload: string): string => {
  const numberOfOnes = countOnes(payload);
  const parityBit = getParityBit(numberOfOnes);

  return payload + parityBit;
};

console.log(getFrame("10101"));
console.log(getFrame("10100"));
