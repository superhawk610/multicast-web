import * as React from 'react';
import { connect } from 'react-redux';

import Select from '../components/Select';

import { IApplicationState } from '../reducers';
import { getHostById, IHost } from '../reducers/hosts.reducer';
import { getDevicesForHost, IDevice } from '../reducers/devices.reducer';

interface IOwnProps {
  id: number;
}

interface IStateProps {
  devices: IDevice[];
  host: IHost;
}

interface IState {
  deviceId: string;
}

type Props = IOwnProps & IStateProps;

class BlackoutForm extends React.Component<Props, IState> {
  public state: IState = {
    deviceId: 'all',
  };

  public onChange = (deviceId: string) => this.setState({ deviceId });

  public render() {
    const { devices, host } = this.props;
    const { deviceId } = this.state;

    return (
      <>
        <Select
          name="identifier"
          label="Device"
          value={deviceId}
          onChange={this.onChange}
          options={[
            { name: `All Devices for ${host.nickname}`, value: 'all' },
            ...devices.map(device => ({
              name: device.nickname,
              value: device.identifier,
            })),
          ]}
        />
        <p>
          Are you sure? This <strong>Blackout</strong> will disable all
          connected device displays and display a black screen instead.
        </p>
      </>
    );
  }
}

const mapStateToProps = (state: IApplicationState, { id }: IOwnProps) => ({
  devices: getDevicesForHost(state, id),
  host: getHostById(state, id),
});

export default connect(mapStateToProps)(BlackoutForm);
