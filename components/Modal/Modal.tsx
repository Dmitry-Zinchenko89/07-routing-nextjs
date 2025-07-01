'use client';

import { useRouter } from 'next/navigation';
import css from './Modal.module.css';
import { ReactNode, useEffect } from 'react';

interface Props {
    children: ReactNode;
}

export default function Modal({ children }: Props) {
    const router = useRouter();

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') router.back();
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [router]);

    return (
        <div className={css.overlay} onClick={() => router.back()}>
            <div className={css.modal} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}
