import * as React from 'react';
import { connect } from 'react-redux';

import { Row, Column } from '../components/Grid';
import Input from '../components/Input';
import { IApplicationState } from '../reducers';
import { IDevice, getDeviceById } from '../reducers/devices.reducer';

interface IOwnProps {
  id: string;
}

interface IStateProps {
  device: IDevice;
}

interface IState {
  device: IDevice | null;
}

type Props = IOwnProps & IStateProps;

class DeviceForm extends React.Component<Props, IState> {
  public static getDerivedStateFromProps(props: Props, state: IState) {
    if (state.device) return null;
    return { device: props.device };
  }

  public state: IState = {
    device: null,
  };

  public onChange = (key: string) => (value: string) =>
    this.setState(state => ({ device: { ...state.device!, [key]: value } }));

  public render() {
    const { device } = this.state;
    const identifier = device!.identifier || '';
    const nickname = device!.nickname || '';

    return (
      <>
        <Row>
          <Column>
            <Input disabled label="Identifier" defaultValue={identifier} />
          </Column>
        </Row>
        <Row>
          <Column>
            <Input
              name="nickname"
              label="Nickname"
              value={nickname}
              onChange={this.onChange('nickname')}
            />
          </Column>
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state: IApplicationState, { id }: IOwnProps) => ({
  device: getDeviceById(state, id),
});

export default connect(mapStateToProps)(DeviceForm);
