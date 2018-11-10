import * as React from 'react';
import { connect } from 'react-redux';

import Message, { MessageTheme, MessageStyle } from '../components/Message';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Select from '../components/Select';
import ButtonGroup, { IButton } from '../components/ButtonGroup';
import Spacer from '../components/Spacer';

import { IApplicationState } from '../reducers';
import { getDevicesForHost, IDevice } from '../reducers/devices.reducer';
import { getHostById, IHost } from '../reducers/hosts.reducer';

import { THEMES } from '../constants';

interface IOwnProps {
  id: number;
}

interface IStateProps {
  devices: IDevice[];
  host: IHost;
}

interface IState {
  deviceId: string;
  heading: string;
  message: string;
  theme: MessageTheme;
  style: MessageStyle;
  duration: number;
}

type Props = IOwnProps & IStateProps;

class AlertForm extends React.Component<Props, IState> {
  public state: IState = {
    deviceId: 'all',
    heading: '',
    message: '',
    theme: THEMES.primary,
    style: 'bold',
    duration: 60 * 1000,
  };

  private themeButtons: IButton[] = [
    { text: 'None', value: '' },
    { text: 'Dark', value: THEMES.dark },
    { text: 'Primary', value: THEMES.primary, theme: THEMES.primary },
    { text: 'Link', value: THEMES.link, theme: THEMES.link },
    { text: 'Info', value: THEMES.info, theme: THEMES.info },
    { text: 'Success', value: THEMES.success, theme: THEMES.success },
    { text: 'Warning', value: THEMES.warning, theme: THEMES.warning },
    { text: 'Danger', value: THEMES.danger, theme: THEMES.danger },
  ];

  private styleButtons: IButton[] = [
    { text: 'Bold', value: 'bold' },
    { text: 'Minimal', value: 'minimal' },
  ];

  private durationButtons: IButton[] = [
    { text: '1m', value: 60 * 1000 },
    { text: '5m', value: 5 * 60 * 1000 },
    { text: '30m', value: 30 * 60 * 1000 },
    { text: '1h', value: 60 * 60 * 1000 },
    { text: '12h', value: 12 * 60 * 60 * 1000 },
    { text: '24h', value: 24 * 60 * 60 * 1000 },
  ];

  public onDeviceChange = (deviceId: string) => this.setState({ deviceId });

  public onHeadingChange = (heading: string) => this.setState({ heading });

  public onMessageChange = (message: string) => this.setState({ message });

  public onThemeChange = (theme: MessageTheme) => this.setState({ theme });

  public onStyleChange = (style: MessageStyle) => this.setState({ style });

  public onDurationChange = (duration: number) => this.setState({ duration });

  public render() {
    const { devices, host } = this.props;
    const { deviceId, heading, message, theme, style, duration } = this.state;

    return (
      <>
        <Select
          label="Device"
          name="identifier"
          value={deviceId}
          onChange={this.onDeviceChange}
          options={[
            { name: `All Devices for ${host.nickname}`, value: 'all' },
            ...devices.map(device => ({
              name: device.nickname,
              value: device.identifier,
            })),
          ]}
        />
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
        <label className="label">Duration</label>
        <ButtonGroup
          buttons={this.durationButtons}
          value={duration}
          onChange={this.onDurationChange}
        />
      </>
    );
  }
}

const mapStateToProps = (state: IApplicationState, { id }: IOwnProps) => ({
  devices: getDevicesForHost(state, id),
  host: getHostById(state, id),
});

export default connect(mapStateToProps)(AlertForm);
