import * as React from 'react';
import { connect } from 'react-redux';

import { Row, Column } from '../components/Grid';
import Input from '../components/Input';
import Table from '../components/Table';
import Button from '../components/Button';
import StatusLight from '../components/StatusLight';
import IconButton from '../components/IconButton';
import PixelShifter from '../components/PixelShifter';
import ThickenSvg from '../components/ThickenSvg';

import DeviceModal from '../modals/DeviceModal';
import AlertModal from '../modals/AlertModal';
import BlackoutModal from '../modals/BlackoutModal';

import { refreshCw } from 'react-icons-kit/feather/refreshCw';

import { THEMES } from '../constants';

import { IApplicationState } from '../reducers';
import { getHostById, IHost } from '../reducers/hosts.reducer';
import { IDevice, getDevicesForHost } from '../reducers/devices.reducer';
import * as actions from '../actions';

interface IOwnProps {
  id: number;
}

interface IStateProps {
  loading: boolean;
  error: Error | null;
  host: IHost;
  devices: IDevice[];
}

interface IDispatchProps {
  fetchDevicesForHost: (id: number) => void;
}

interface IState {
  host: IHost | null;
  alertModalActive: boolean;
  blackoutModalActive: boolean;
  activeDeviceId: string | null;
}

type Props = IOwnProps & IStateProps & IDispatchProps;

class HostDetails extends React.Component<Props, IState> {
  public static getDerivedStateFromProps(props: Props, state: IState) {
    if (state.host) return null;
    return { host: props.host };
  }

  public state: IState = {
    host: null,
    alertModalActive: false,
    blackoutModalActive: false,
    activeDeviceId: null,
  };

  public onChange = (key: string) => (value: string) =>
    this.setState(state => ({ host: { ...state.host!, [key]: value } }));

  public onManageClick = (device: IDevice) =>
    this.setState({ activeDeviceId: device.identifier });

  public onRefreshClick = () =>
    this.props.fetchDevicesForHost(this.props.host.id);

  public onAlertClick = () => this.setState({ alertModalActive: true });

  public onBlackoutClick = () => this.setState({ blackoutModalActive: true });

  public closeDeviceModal = () => this.setState({ activeDeviceId: null });

  public closeAlertModal = () => this.setState({ alertModalActive: false });

  public closeBlackoutModal = () =>
    this.setState({ blackoutModalActive: false });

  public render() {
    const {
      loading,
      error,
      host: { id, nickname: originalNickname },
      devices,
    } = this.props;
    const {
      host,
      alertModalActive,
      blackoutModalActive,
      activeDeviceId,
    } = this.state;
    const nickname = host!.nickname || '';
    const actionForRow = (row: IDevice) => ({
      text: 'Manage',
      onClick: this.onManageClick,
    });

    return (
      <>
        <Input
          label="Nickname"
          placeholder={originalNickname}
          theme={nickname ? '' : THEMES.danger}
          value={host!.nickname || ''}
          onChange={this.onChange('nickname')}
        />
        <label className="label">Actions</label>
        <Row style={{ marginBottom: '5px' }}>
          <Column width={2}>
            <Button
              block
              text="Alert"
              theme={THEMES.info}
              onClick={this.onAlertClick}
            />
          </Column>
          <Column>
            <p style={{ marginTop: '5px' }}>
              <strong>Alerts</strong> will appear at the bottom of the device's
              screen for the allotted amount of time.
            </p>
          </Column>
        </Row>
        <Row style={{ marginBottom: '5px' }}>
          <Column width={2}>
            <Button
              block
              text="Blackout"
              theme={THEMES.danger}
              onClick={this.onBlackoutClick}
            />
          </Column>
          <Column>
            <p style={{ marginTop: '5px' }}>
              Initiating a <strong>Blackout</strong> will disable channel output
              for all devices on this host and instead display a black screen.
            </p>
          </Column>
        </Row>
        <label className="label">Connected Devices</label>
        <Table
          data={devices}
          loading={loading}
          error={error}
          headers={['nickname', 'identifier', 'status']}
          headerLabels={['Nickname', 'Device Identifier', 'Status']}
          renderRow={{
            status: (device: IDevice) => <StatusLight status={device.status} />,
          }}
          actionForRow={actionForRow}
          actionHeader={
            <PixelShifter up={2}>
              <ThickenSvg>
                <IconButton
                  rotate
                  icon={refreshCw}
                  size={18}
                  onClick={this.onRefreshClick}
                />
              </ThickenSvg>
            </PixelShifter>
          }
          noRecordsFoundText="No Devices Found."
        />
        <DeviceModal id={activeDeviceId} onClose={this.closeDeviceModal} />
        <AlertModal
          hostId={id}
          active={alertModalActive}
          onClose={this.closeAlertModal}
        />
        <BlackoutModal
          hostId={id}
          active={blackoutModalActive}
          onClose={this.closeBlackoutModal}
        />
      </>
    );
  }
}

const mapStateToProps = (
  state: IApplicationState,
  { id }: IOwnProps,
): IStateProps => ({
  loading: state.devices.loading,
  error: state.devices.error,
  host: getHostById(state, id),
  devices: getDevicesForHost(state, id),
});

const mapDispatchToProps = {
  fetchDevicesForHost: actions.fetchDevicesForHost,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HostDetails);
