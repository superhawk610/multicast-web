import * as React from 'react';
import { connect } from 'react-redux';

import Message, { MessageTheme, MessageStyle } from '../components/Message';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import ButtonGroup, { IButton } from '../components/ButtonGroup';
import Spacer from '../components/Spacer';

import { IApplicationState } from '../reducers';

import { THEMES } from '../constants';

interface IProps {
  id: number;
}

interface IState {
  heading: string;
  message: string;
  theme: MessageTheme;
  style: MessageStyle;
}

class AlertForm extends React.Component<IProps, IState> {
  public state: IState = {
    heading: '',
    message: '',
    theme: THEMES.primary,
    style: 'bold',
  };

  private themeButtons: IButton[] = [
    { text: 'None', value: '', theme: THEMES.none },
    { text: 'Dark', value: THEMES.dark, theme: THEMES.dark },
    { text: 'Primary', value: THEMES.primary, theme: THEMES.primary },
    { text: 'Link', value: THEMES.link, theme: THEMES.link },
    { text: 'Info', value: THEMES.info, theme: THEMES.info },
    { text: 'Success', value: THEMES.success, theme: THEMES.success },
    { text: 'Warning', value: THEMES.warning, theme: THEMES.warning },
    { text: 'Danger', value: THEMES.danger, theme: THEMES.danger },
  ];

  private styleButtons: IButton[] = [
    { text: 'Bold', value: 'bold', theme: THEMES.dark },
    { text: 'Minimal', value: 'minimal', theme: THEMES.dark },
  ];

  public onHeadingChange = (heading: string) => this.setState({ heading });

  public onMessageChange = (message: string) => this.setState({ message });

  public onThemeChange = (theme: MessageTheme) => this.setState({ theme });

  public onStyleChange = (style: MessageStyle) => this.setState({ style });

  public render() {
    const { heading, message, theme, style } = this.state;

    return (
      <>
        <Spacer />
        <Message
          theme={theme}
          style={style}
          heading={heading || 'Alert Heading'}
          text={message || 'Alert Body'}
        />
        <Spacer />
        <Input
          placeholder="Alert Heading"
          label="Heading"
          name="heading"
          value={heading}
          onChange={this.onHeadingChange}
        />
        <TextArea
          placeholder="Alert Body"
          label="Message"
          name="message"
          value={message}
          onChange={this.onMessageChange}
        />
        <Spacer />
        <label className="label">Theme</label>
        <ButtonGroup
          buttons={this.themeButtons}
          value={theme}
          onChange={this.onThemeChange}
        />
        <label className="label">Style</label>
        <ButtonGroup
          buttons={this.styleButtons}
          value={style}
          onChange={this.onStyleChange}
        />
      </>
    );
  }
}

const mapStateToProps = (state: IApplicationState, { id }: IProps) => ({});

export default connect(mapStateToProps)(AlertForm);
