'use client';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';

export default function NotePreview() {
    const router = useRouter();
    const params = useParams();
    const id = Number(params?.id);

    const {
        data: note,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
        enabled: !isNaN(id),
    });

    const handleClose = useCallback(() => {
        router.back();
    }, [router]);

    useEffect(() => {
        window.addEventListener('keydown', handleClose);
        return () => window.removeEventListener('keydown', handleClose);
    }, [handleClose]);

    if (isLoading) return null;
    if (isError || !note) return null;

    return (
        <Modal onClose={handleClose}>
            <div className={css.preview}>
                <h2 className={css.title}>{note.title}</h2>
                <p className={css.tag}>Tag: {note.tag}</p>
                <p className={css.content}>{note.content}</p>
                <div className={css.dates}>
                    <p>Created: {new Date(note.createdAt).toLocaleString()}</p>
                    {note.updatedAt && note.updatedAt !== note.createdAt && (
                        <p>Updated: {new Date(note.updatedAt).toLocaleString()}</p>
                    )}
                </div>
                <button onClick={handleClose} className={css.closeButton}>
                    Close
                </button>
            </div>
        </Modal>
    );
}