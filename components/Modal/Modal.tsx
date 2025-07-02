'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ children, onClose }: ModalProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [onClose, isMounted]);

    const handleBackdropClick = () => {
        onClose();
    };

    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    if (!isMounted) return null;

    return createPortal(
        <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
            <div className={css.modal} onClick={stopPropagation}>
                {children}
            </div>
        </div>,
        document.body
    );
}