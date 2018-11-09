import * as React from 'react';

import Icon from 'react-icons-kit';

import { Themes, THEMES } from '../constants';

import { IInputEvent } from '../types';

type InputTheme =
  | Themes.primary
  | Themes.info
  | Themes.success
  | Themes.warning
  | Themes.danger;

interface IProps {
  label?: string;
  placeholder?: string;
  name?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: any;
  rightIcon?: any;
  theme?: InputTheme | '';
}

const handleChange = (onChange: (value: string) => void) => ({
  target: { value },
}: IInputEvent) => onChange(value);

const Input = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  defaultValue,
  disabled,
  loading,
  leftIcon,
  rightIcon,
  theme = THEMES.none,
}: IProps) => {
  const loadingClass = loading ? 'is-loading' : '';
  const leftIconClass = leftIcon ? 'has-icons-left' : '';
  const rightIconClass = rightIcon ? 'has-icons-right' : '';

  return (
    <div className="field">
      {label && <label className="label">{label}</label>}
      <p
        className={`control ${loadingClass} ${leftIconClass} ${rightIconClass}`}
      >
        <input
          className={`input ${theme}`}
          placeholder={placeholder}
          disabled={disabled}
          name={name}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange && handleChange(onChange)}
        />
        {leftIcon && (
          <span className="icon is-left">
            <Icon icon={leftIcon} />
          </span>
        )}
        {rightIcon && (
          <span className="icon is-right">
            <Icon icon={rightIcon} />
          </span>
        )}
      </p>
    </div>
  );
};

export default Input;
