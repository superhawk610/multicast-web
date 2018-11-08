import * as React from 'react';

import Modal, { IProps as IModalProps } from '../components/Modal';

interface IOwnProps {
  hostId: number | null;
}

type Props = IOwnProps & Pick<IModalProps, 'active' | 'onClose'>;

const handleSubmit = () => null;

const BlackoutModal = ({ hostId, active, onClose }: Props) =>
  hostId ? (
    <Modal
      active={active}
      heading="Initiate Blackout"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      modal for host {hostId}
    </Modal>
  ) : null;

export default BlackoutModal;
