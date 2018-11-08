import * as React from 'react';

interface IProps {
  height?: number;
}

const Spacer = ({ height = 20 }: IProps) => (
  <div style={{ height: `${height}px` }} />
);

export default Spacer;
