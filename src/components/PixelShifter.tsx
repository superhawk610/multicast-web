import * as React from 'react';

interface IProps {
  up?: number;
  right?: number;
  down?: number;
  left?: number;
  children: React.ReactNode;
}

const PixelShifter = ({
  up = 0,
  right = 0,
  down = 0,
  left = 0,
  children,
}: IProps) => (
  <div style={{ transform: `translate(${right - left}px, ${down - up}px)` }}>
    {children}
  </div>
);

export default PixelShifter;
