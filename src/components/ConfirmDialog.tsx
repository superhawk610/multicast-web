import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Box from './Box';
import Button from './Button';

import { THEMES } from '../constants';

import { IApplicationState } from '../reducers';
import { DialogResultAction } from '../reducers/dialog.reducer';

import { hideDialog } from '../actions';

import { Dispatch } from 'redux';

interface IStateProps {
  active: boolean;
  heading: string;
  message: string;
  onConfirmAction: DialogResultAction;
  onCancelAction: DialogResultAction | null;
}

interface IDispatchProps {
  dispatch: Dispatch;
}

type Props = IStateProps & IDispatchProps;

class ConfirmDialog extends React.Component<Props> {
  public onCancel = () => this.props.dispatch(hideDialog());

  public onConfirm = () => {
    const { dispatch, onConfirmAction } = this.props;

    dispatch(onConfirmAction);
    this.onCancel();
  };

  public render() {
    const { active, heading, message } = this.props;

    return (
      <div className={`modal ${active ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={this.onCancel} />
        <div className="modal-content">
          <Box>
            <DialogHeading>{heading}</DialogHeading>
            <DialogMessage>{message}</DialogMessage>
            <Button
              adjacent
              onClick={this.onConfirm}
              text="Confirm"
              theme={THEMES.danger}
            />
            <Button
              onClick={this.onCancel}
              text="Cancel"
              theme={THEMES.light}
            />
          </Box>
        </div>
        <button className="modal-close" onClick={this.onCancel} />
      </div>
    );
  }
}

const DialogHeading = styled.div`
  font-size: 1.2em;
`;

const DialogMessage = styled.p`
  padding: 5px 0 20px;
`;

const mapStateToProps = (state: IApplicationState) => ({
  active: state.dialog.active,
  heading: state.dialog.heading,
  message: state.dialog.message,
  onConfirmAction: state.dialog.onConfirmAction,
  onCancelAction: state.dialog.onCancelAction,
});

export default connect(mapStateToProps)(ConfirmDialog);
