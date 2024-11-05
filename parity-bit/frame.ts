export const BINARY = {
  ZERO_STRING: "0",
  ONE_STRING: "1",
} as const;

export const countOnes = (binary: string) => {
  return binary.split("").reduce((accumulator, bit) => {
    if (bit === BINARY.ONE_STRING) {
      return accumulator + 1;
    }
    return accumulator;
  }, 0);
};

const isEven = (numberOfOnes: number) => numberOfOnes % 2 === 0;

export const getParityBit = (numberOfOnes: number) =>
  isEven(numberOfOnes) ? BINARY.ONE_STRING : BINARY.ZERO_STRING;
