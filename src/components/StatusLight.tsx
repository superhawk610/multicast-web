import * as React from 'react';
import styled from 'styled-components';
import { colorForStatus } from '../utils';

import { Status } from '../types';

interface IProps {
  status: Status;
  text?: string;
}

const StatusLight = ({ status, text = status }: IProps) => (
  <div>
    <Light color={colorForStatus(status)} />
    <span>{text}</span>
  </div>
);

const Light = styled.div<{ color: string }>`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background: ${props => props.color};
  box-shadow: 0 0 3px ${props => props.color};
  margin: 0 10px -1px 0;
`;

export default StatusLight;
