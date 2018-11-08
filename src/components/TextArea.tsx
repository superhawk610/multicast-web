import * as React from 'react';

import { Themes, THEMES } from '../constants';

import { IInputEvent } from '../types';

type TextAreaTheme =
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
  theme?: TextAreaTheme | '';
}

const handleChange = (onChange: (value: string) => void) => ({
  target: { value },
}: IInputEvent) => onChange(value);

const TextArea = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  defaultValue,
  disabled,
  loading,
  theme = THEMES.none,
}: IProps) => (
  <div className="field">
    {label && <label className="label">{label}</label>}
    <p className={`control ${loading ? 'is-loading' : ''}`}>
      <textarea
        className={`textarea ${theme}`}
        placeholder={placeholder}
        disabled={disabled}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange && handleChange(onChange)}
      />
    </p>
  </div>
);

export default TextArea;
