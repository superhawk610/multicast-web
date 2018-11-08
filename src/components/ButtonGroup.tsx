import * as React from 'react';

import { ButtonTheme } from './Button';

import { THEMES } from '../constants';

type ButtonValue = string | number;

export interface IButton {
  text: string;
  theme?: ButtonTheme;
  value: ButtonValue;
}

interface IProps {
  buttons: IButton[];
  value: ButtonValue | null;
  onChange: (value: ButtonValue) => void;
}

const ButtonGroup = ({ buttons, value, onChange }: IProps) => (
  <div className="buttons has-addons">
    {buttons.map(({ text, theme = THEMES.none, value: buttonValue }, index) => {
      const active = buttonValue === value;
      const onClick = () => onChange(buttonValue);

      return (
        <span
          key={index}
          className={`button ${active ? theme : ''} ${
            active ? 'is-selected' : ''
          }`}
          onClick={onClick}
        >
          {text}
        </span>
      );
    })}
  </div>
);

export default ButtonGroup;
