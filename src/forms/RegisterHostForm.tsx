import * as React from 'react';
import { connect } from 'react-redux';
import isUrl = require('is-url');

import { Row, Column } from '../components/Grid';
import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';
import ErrorDisplay from '../components/ErrorDisplay';
import Message from '../components/Message';

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
  loading: boolean;
  error: Error | null;
}

interface IDispatchProps {
  registerHost: (host: Omit<IHost, 'id' | 'status'>) => void;
  checkHostValidity: (address: string) => void;
}

interface IState {
  nickname: string;
  address: string;
  nicknameError: string | null;
  addressError: string | null;
  validationAttempts: number;
}

type Props = IStateProps & IDispatchProps;

class RegisterHostForm extends React.Component<Props, IState> {
  public state: IState = {
    nickname: '',
    address: '',
    nicknameError: null,
    addressError: null,
    validationAttempts: 0,
  };

  public onNicknameChange = (nickname: string) => this.setState({ nickname });

  public onAddressChange = (address: string) => this.setState({ address });

  public validate = () => {
    const { nickname, address } = this.state;
    let nicknameError = null;
    let addressError = null;

    if (!nickname) nicknameError = 'Nickname cannot be left blank.';
    if (!address) addressError = 'Address cannot be left blank.';
    else if (!isUrl(address)) addressError = 'Not a valid URL.';

    this.setState({ nicknameError, addressError });
    return !nicknameError && !addressError;
  };

  public onSubmit = () => {
    if (this.validate()) {
      const { hostIsValid, checkHostValidity, registerHost } = this.props;
      const { nickname, address } = this.state;

      if (!hostIsValid) checkHostValidity(address);
      else registerHost({ address, nickname });
      this.setState(state => ({
        validationAttempts: state.validationAttempts + 1,
      }));
    }
  };

  public render() {
    const {
      hostIsValid,
      hostValidationLoading,
      hostValidationError,
      loading,
      error,
    } = this.props;
    const {
      nickname,
      address,
      nicknameError,
      addressError,
      validationAttempts,
    } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        {validationAttempts > 1 && (
          <Message
            heading="Having Trouble Connecting?"
            text={
              <>
                Make sure your deployment host is running Multicast v3.0 or
                higher, and if it is behind a reverse proxy that it properly
                exposes the <code>X-Multicast-Version</code> header. Click{' '}
                <a href="#">here</a> for more info.
              </>
            }
            theme={THEMES.info}
          />
        )}
        <Row>
          <Column>
            <Input
              placeholder="http://www.deployment-ip.com:1234"
              name="address"
              label="Address"
              error={addressError}
              value={address}
              onChange={this.onAddressChange}
            />
          </Column>
          <Column>
            <Input
              placeholder="Physical Location"
              name="nickname"
              label="Nickname"
              error={nicknameError}
              value={nickname}
              onChange={this.onNicknameChange}
            />
          </Column>
        </Row>
        {hostValidationError && <ErrorDisplay error={hostValidationError} />}
        {error && <ErrorDisplay error={error} />}
        <Button
          submit
          adjacent
          loading={hostValidationLoading}
          disabled={hostIsValid}
          text={hostIsValid ? 'Connected!' : 'Test Connection'}
          leftIcon={hostIsValid ? check : undefined}
          theme={hostIsValid ? THEMES.light : THEMES.link}
        />
        <Button
          submit
          disabled={!hostIsValid}
          loading={loading}
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
  loading: state.hosts.modifyLoading,
  error: state.hosts.modifyError,
});

const mapDispatchToProps = {
  checkHostValidity: actions.checkHostValidity,
  registerHost: actions.registerHost,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterHostForm);
