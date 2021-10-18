export const getRandomInteger = (a = 0, b = 1) : number => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomFloat = function (a = 0, b = 10, float = 1) :number {
  const low = Math.min(Math.abs(a), Math.abs(b));
  const hight = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (hight - low) + low;
  return +result.toFixed(float);
};

export const getRandomArrayElement = <T>(elements:T[]):T => elements[getRandomInteger(0,elements.length-1)];
