import * as React from 'react';

import Modal, { IProps as IModalProps } from '../components/Modal';

import AlertForm from '../forms/AlertForm';

interface IOwnProps {
  hostId: number | null;
}

type Props = IOwnProps & Pick<IModalProps, 'active' | 'onClose'>;

const handleSubmit = () => null;

const AlertModal = ({ hostId, active, onClose }: Props) =>
  hostId ? (
    <Modal
      active={active}
      heading="Send Alert"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <AlertForm id={hostId} />
    </Modal>
  ) : null;

export default AlertModal;
