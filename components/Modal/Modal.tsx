'use client';

import { useRouter } from 'next/navigation';
import css from './Modal.module.css';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

export default function Modal({ children }: Props) {
    const router = useRouter();

    const close = () => router.back();

    return (
        <div className={css.backdrop} onClick={close}>
            <div className={css.modal} onClick={e => e.stopPropagation()}>
                <button className={css.closeButton} onClick={close}>
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
}