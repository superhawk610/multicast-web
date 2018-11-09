import * as React from 'react';

import Modal, { IProps as IModalProps } from '../components/Modal';

import BlackoutForm from '../forms/BlackoutForm';

import { THEMES } from '../constants';

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
      submitText="Begin"
      submitButtonTheme={THEMES.danger}
    >
      <BlackoutForm id={hostId} />
    </Modal>
  ) : null;

export default BlackoutModal;
