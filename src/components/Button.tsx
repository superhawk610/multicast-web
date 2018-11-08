import * as React from 'react';

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
  text: string;
  onClick: () => void;
  theme?: ButtonTheme | '';
  disabled?: boolean;
  loading?: boolean;
}

const Button = ({
  text,
  onClick,
  theme = '',
  disabled,
  loading,
  ...delegated
}: IProps) => (
  <button
    className={`button ${theme} ${loading ? 'is-loading' : ''}`}
    disabled={disabled}
    onClick={onClick}
    {...delegated}
  >
    {text}
  </button>
);

export default Button;
