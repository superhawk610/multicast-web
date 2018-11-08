import * as React from 'react';
import { connect } from 'react-redux';

import Modal, { IProps as IModalProps } from '../components/Modal';
import StatusLight from '../components/StatusLight';

import DeviceForm from '../forms/DeviceForm';

import { IApplicationState } from '../reducers';
import { getDeviceById } from '../reducers/devices.reducer';

import { Status } from '../types';

interface IOwnProps {
  id: string | null;
}

interface IStateProps {
  status: Status;
}

type Props = IOwnProps & IStateProps & Pick<IModalProps, 'onClose'>;

const handleSubmit = () => null;

const DeviceModal = ({ id, status, onClose }: Props) =>
  id ? (
    <Modal
      active
      heading="Manage Device"
      accent={<StatusLight status={status} />}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <DeviceForm id={id} />
    </Modal>
  ) : null;

const mapStateToProps = (state: IApplicationState, { id }: IOwnProps) => ({
  status: id ? getDeviceById(state, id).status : 'searching',
});

export default connect(mapStateToProps)(DeviceModal);
