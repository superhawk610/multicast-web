import { Status } from './types';

import { COLORS } from './constants';

export const keyBy = (arr: any[], key: string) => {
  return arr.reduce((carry, el) => {
    carry[el[key]] = el;
    return carry;
  }, {});
};

export const colorForStatus = (status: Status) => {
  switch (status) {
    case 'online':
      return COLORS.green;
    case 'offline':
      return COLORS.red;
    case 'searching':
      return COLORS.yellow;
    default:
      return COLORS.greyLight;
  }
};
