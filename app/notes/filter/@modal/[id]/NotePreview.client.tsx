'use client';

import { useQuery } from '@tanstack/react-query';

import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from './NoteDetails.module.css';

type Props = {
    id: number;
};

export default function NotePreview({ id }: Props) {


    const { data, isLoading, isError } = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
    });

    if (isLoading) {
        return <Modal><p className={css.message}>Loading...</p></Modal>;
    }

    if (isError || !data) {
        return <Modal><p className={css.message}>Error loading note</p></Modal>;
    }

    return (
        <Modal>
            <div className={css.note}>
                <h2 className={css.title}>{data.title}</h2>
                <p className={css.content}>{data.content}</p>
                <p className={css.tag}>#{data.tag}</p>
            </div>
        </Modal>
    );
}