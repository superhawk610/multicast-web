import * as React from 'react';

export const Row = ({ ...delegated }) => (
  <div className="columns" {...delegated} />
);

interface IProps {
  width?: number;
  [x: string]: any;
}
export const Column = ({ width, ...delegated }: IProps) => (
  <div className={`column ${width ? `is-${width}` : ''}`} {...delegated} />
);
