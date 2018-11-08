import * as React from 'react';

import Button from './Button';

import { THEMES } from '../constants';

export interface IProps {
  heading: string;
  accent?: React.ReactNode;
  active: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
}

const Modal = ({
  heading,
  accent,
  active,
  onClose,
  onSubmit,
  children,
}: IProps) => (
  <div className={`modal ${active ? 'is-active' : ''}`}>
    <div className="modal-background" onClick={onClose} />
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">{heading}</p>
        {accent && <div style={{ marginRight: '10px' }}>{accent}</div>}
        <button className="delete" aria-label="close" onClick={onClose} />
      </header>
      <section className="modal-card-body">{children}</section>
      <footer className="modal-card-foot">
        <Button text="Save" theme={THEMES.success} onClick={onSubmit} />
        <Button text="Cancel" theme={THEMES.light} onClick={onClose} />
      </footer>
    </div>
  </div>
);

export default Modal;
