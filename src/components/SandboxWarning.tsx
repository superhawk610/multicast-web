import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import PixelShifter from './PixelShifter';

import Icon from 'react-icons-kit';
import { alertTriangle } from 'react-icons-kit/feather/alertTriangle';

import { COLORS } from '../constants';

import { IApplicationState } from '../reducers';
import { getUtilResponse } from '../reducers/utils.reducer';
import * as actions from '../actions';

interface IStateProps {
  isSandbox: boolean;
}

interface IDispatchProps {
  checkSandbox: () => void;
}

type Props = IStateProps & IDispatchProps;

class SandboxWarning extends React.Component<Props> {
  public componentDidMount() {
    this.props.checkSandbox();
  }

  public render() {
    if (!this.props.isSandbox) return null;

    return (
      <Container>
        <PixelShifter up={2}>
          <Icon icon={alertTriangle} size={24} style={{ marginRight: '5px' }} />
        </PixelShifter>
        <strong>SANDBOX ENVIRONMENT</strong>
        <div>Changes will not be persisted through server reboot.</div>
      </Container>
    );
  }
}

const Container = styled.div`
  position: absolute;
  top: 25px;
  right: 25px;
  color: ${COLORS.orange};
  text-align: right;

  strong {
    color: ${COLORS.orange};
  }
`;

const mapStateToProps = (state: IApplicationState) => ({
  isSandbox: getUtilResponse(state, 'isSandbox', { sandbox: false }).sandbox,
});

const mapDispatchToProps = {
  checkSandbox: actions.checkSandbox,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SandboxWarning);
