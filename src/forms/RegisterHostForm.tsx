import * as React from 'react';
import { connect } from 'react-redux';

import { Row, Column } from '../components/Grid';
import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';

import { check } from 'react-icons-kit/feather/check';

import { THEMES } from '../constants';

import { IApplicationState } from '../reducers';
import { IHost } from '../reducers/hosts.reducer';
import {
  getUtilLoading,
  getUtilError,
  getUtilResponse,
} from '../reducers/utils.reducer';
import * as actions from '../actions';

import { Omit } from '../types';

interface IStateProps {
  hostIsValid: boolean;
  hostValidationLoading: boolean;
  hostValidationError: Error | null;
}

interface IDispatchProps {
  registerHost: (host: Omit<IHost, 'id' | 'status'>) => void;
  checkHostValidity: (address: string) => void;
}

interface IState {
  nickname: string;
  address: string;
}

type Props = IStateProps & IDispatchProps;

class RegisterHostForm extends React.Component<Props, IState> {
  public state: IState = {
    nickname: '',
    address: '',
  };

  public onNicknameChange = (nickname: string) => this.setState({ nickname });

  public onAddressChange = (address: string) => this.setState({ address });

  public onClickTestConnection = () => {
    const { checkHostValidity } = this.props;
    const { address } = this.state;

    checkHostValidity(address);
  };

  public onSubmit = () => {
    const { registerHost } = this.props;
    const { nickname, address } = this.state;
  };

  public render() {
    const {
      hostIsValid,
      hostValidationLoading,
      hostValidationError,
    } = this.props;
    const { nickname, address } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        <Row>
          <Column>
            <Input
              placeholder="www.deployment-ip.com"
              name="address"
              label="Address"
              value={address}
              onChange={this.onAddressChange}
            />
          </Column>
          <Column>
            <Input
              placeholder="Host Location"
              name="nickname"
              label="Nickname"
              value={nickname}
              onChange={this.onNicknameChange}
            />
          </Column>
        </Row>
        {hostValidationError && <div>{hostValidationError.message}</div>}
        <Button
          adjacent
          loading={hostValidationLoading}
          disabled={hostIsValid}
          text={hostIsValid ? 'Connected!' : 'Test Connection'}
          leftIcon={hostIsValid ? check : undefined}
          theme={hostIsValid ? THEMES.light : THEMES.link}
          onClick={this.onClickTestConnection}
        />
        <Button
          submit
          disabled={!hostIsValid}
          text="Register"
          theme={hostIsValid ? THEMES.success : THEMES.light}
        />
      </Form>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  hostIsValid: getUtilResponse(state, 'hostIsValid', { valid: false }).valid,
  hostValidationLoading: getUtilLoading(state, 'hostIsValid'),
  hostValidationError: getUtilError(state, 'hostIsValid'),
});

const mapDispatchToProps = {
  checkHostValidity: actions.checkHostValidity,
  registerHost: actions.registerHost,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterHostForm);
