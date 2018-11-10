import * as React from 'react';

import InputError from './InputError';

import Icon from 'react-icons-kit';

import { Themes, THEMES } from '../constants';

import { IInputEvent } from '../types';

type SelectTheme =
  | Themes.primary
  | Themes.info
  | Themes.success
  | Themes.warning
  | Themes.danger;

type OptionValue = string | number;

interface IOption {
  name: string;
  value: OptionValue;
}

type Option = IOption | OptionValue;

interface IProps {
  block?: boolean;
  label?: string;
  placeholder?: string;
  error?: string | null;
  name?: string;
  value?: OptionValue;
  onChange?: (value: OptionValue) => void;
  defaultValue?: string;
  options: Option[];
  disabled?: boolean;
  loading?: boolean;
  icon?: any;
  theme?: SelectTheme | '';
}

const handleChange = (onChange: (value: OptionValue) => void) => ({
  target: { value },
}: IInputEvent) => onChange(value);

const Input = ({
  block,
  label,
  placeholder,
  error,
  name,
  value,
  onChange,
  defaultValue,
  options,
  disabled,
  loading,
  icon,
  theme = THEMES.none,
}: IProps) => {
  const loadingClass = loading ? 'is-loading' : '';
  const iconClass = icon ? 'has-icons-left' : '';
  const blockClass = block ? 'is-fullwidth' : '';

  return (
    <div className="field">
      {label && <label className="label">{label}</label>}
      <div className={`control ${loadingClass} ${iconClass}`}>
        <div className={`select ${blockClass}`}>
          <select
            className={`input ${theme}`}
            placeholder={placeholder}
            disabled={disabled}
            name={name}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange && handleChange(onChange)}
          >
            {options.map((option, index) => {
              const optionName =
                typeof option === 'object' ? option.name : option;
              const optionValue =
                typeof option === 'object' ? option.value : option;

              return (
                <option key={index} value={optionValue}>
                  {optionName}
                </option>
              );
            })}
          </select>
        </div>
        {icon && (
          <span className="icon is-left">
            <Icon icon={icon} />
          </span>
        )}
      </div>
      {error && <InputError>{error}</InputError>}
    </div>
  );
};

export default Input;
