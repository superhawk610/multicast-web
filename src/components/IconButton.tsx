import * as React from 'react';
import styled from 'styled-components';

// NOTE: this requires the PR at https://github.com/wmira/react-icons-kit/pull/35
// to compile properly
import Icon from 'react-icons-kit';

interface IProps {
  icon: any;
  size?: number;
  onClick?: () => void;
  rotate?: boolean;
}

const IconButton = ({
  icon,
  size = 24,
  onClick,
  rotate,
  ...delegated
}: IProps) => (
  <Button rotate={rotate ? 1 : 0} {...delegated}>
    <Icon icon={icon} size={size} onClick={onClick} />
  </Button>
);

const Button = styled.button<{ rotate: number }>`
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  &:active {
    transform: ${props => (props.rotate ? 'rotate(20deg)' : 'translateY(1px)')};
  }
`;

export default IconButton;
