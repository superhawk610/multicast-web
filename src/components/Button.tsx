import * as React from 'react';

import Icon from 'react-icons-kit';

import { Themes } from '../constants';

type ButtonTheme =
  | Themes.white
  | Themes.light
  | Themes.dark
  | Themes.black
  | Themes.text
  | Themes.primary
  | Themes.link
  | Themes.info
  | Themes.success
  | Themes.warning
  | Themes.danger;

interface IProps {
  block?: boolean;
  text: string;
  onClick: () => void;
  theme?: ButtonTheme | '';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: any;
  rightIcon?: any;
}

const Button = ({
  block,
  text,
  onClick,
  theme = '',
  disabled,
  loading,
  leftIcon,
  rightIcon,
  ...delegated
}: IProps) => {
  const className = `button ${block ? 'is-fullwidth' : ''} ${theme} ${
    loading ? 'is-loading' : ''
  }`;

  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
      {...delegated}
    >
      {leftIcon && <Icon icon={leftIcon} style={{ margin: '0 5px 2px 0' }} />}
      <span>{text}</span>
      {rightIcon && <Icon icon={rightIcon} style={{ margin: '0 0 2px 5px' }} />}
    </button>
  );
};

export default Button;
