import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import styles from './Modal.module.css';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabel?: string;
  wide?: boolean;
}

export const Modal = ({ open, onClose, children, ariaLabel = 'Dialog', wide = false }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEscapeKey(onClose, open);

  useEffect(() => {
    if (open) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [open]);

  useEffect(() => {
    if (open && modalRef.current) {
      modalRef.current.focus();
    }
  }, [open]);

  if (!open) return null;

  const root = document.getElementById('modal-root');
  if (!root) return null;

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className={styles.backdrop} onMouseDown={handleBackdropClick}>
      <div
        ref={modalRef}
        className={clsx(styles.modal, wide && styles.modalWide)}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
      >
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close dialog"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 6L18 18M6 18L18 6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    root,
  );
};
