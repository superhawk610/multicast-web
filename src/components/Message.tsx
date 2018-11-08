import * as React from 'react';

import { Themes, THEMES } from '../constants';

export type MessageTheme =
  | Themes.none
  | Themes.dark
  | Themes.primary
  | Themes.link
  | Themes.info
  | Themes.success
  | Themes.warning
  | Themes.danger;

export type MessageStyle = 'bold' | 'minimal';

interface IProps {
  theme?: MessageTheme;
  style?: MessageStyle;
  heading?: string;
  text: string;
}

const Message = ({
  theme = THEMES.none,
  style = 'bold',
  heading,
  text,
}: IProps) => (
  <article className={`message ${theme}`}>
    {style === 'bold' && (
      <div className="message-header">
        <p>{heading}</p>
      </div>
    )}
    <div className="message-body">{text}</div>
  </article>
);

export default Message;
