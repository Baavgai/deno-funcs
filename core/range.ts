export const seqGen = <T>(init: T, test: (x: T) => boolean, next: (x: T) => T): T[] => {
  const xs: T[] = [];
  for (let x = init; test(x); x = next(x)) {
    xs.push(x);
  }
  return xs;
};

export const range = (size: number) =>
  seqGen(0, i => i < size, i => i + 1);
