export const keyBy = (arr: any[], key: string) => {
  return arr.reduce((carry, el) => {
    carry[el[key]] = el;
    return carry;
  }, {});
};
