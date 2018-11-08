import * as React from 'react';
import { connect } from 'react-redux';

import Input from './Input';
import Table from './Table';

import { THEMES } from '../constants';

import { IApplicationState } from '../reducers';
import { getHost, IHost } from '../reducers/hosts.reducer';

interface IProps {
  id: number;
}

interface IStateProps {
  host: IHost;
}

interface IState {
  host: IHost | null;
}

type Props = IProps & IStateProps;

interface IDevice {
  id: number;
  nickname: string;
  identifier: string;
}
const devices: IDevice[] = [
  { id: 1, nickname: 'Foo', identifier: 'ABC-123' },
  { id: 2, nickname: 'Bar', identifier: 'DEF-123' },
  { id: 3, nickname: 'Baz', identifier: 'DEF-456' },
];

class HostDetails extends React.Component<Props, IState> {
  public static getDerivedStateFromProps(props: Props, state: IState) {
    if (state.host) return null;
    return { host: props.host };
  }

  public state: IState = {
    host: null,
  };

  public onChange = (key: string) => (value: string) =>
    this.setState(state => ({ host: { ...state.host!, [key]: value } }));

  public render() {
    const {
      host: { nickname: originalNickname },
    } = this.props;
    const { host } = this.state;
    const nickname = host!.nickname || '';

    return (
      <>
        <Input
          label="Nickname"
          placeholder={originalNickname}
          theme={nickname ? '' : THEMES.danger}
          value={host!.nickname || ''}
          onChange={this.onChange('nickname')}
        />
        <label className="label">Connected Devices</label>
        <Table
          data={devices}
          headers={['id', 'nickname', 'identifier']}
          actionForRow={(row: IDevice) => ({
            text: 'do stuff',
            onClick: (row: IDevice) => console.log('clicked', row.id),
          })}
        />
      </>
    );
  }
}

const mapStateToProps = (
  state: IApplicationState,
  { id }: IProps,
): IStateProps => ({
  host: getHost(state, id),
});

export default connect(mapStateToProps)(HostDetails);
