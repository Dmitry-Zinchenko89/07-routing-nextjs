'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';

interface Props {
    tag?: string;
}

export default function Notes({ tag }: Props) {
    const { data: notes, isLoading, isError } = useQuery({
        queryKey: ['notes', tag],
        queryFn: () => fetchNotes(tag),
    });

    if (isLoading) return <p>Завантаження...</p>;
    if (isError) return <p>Помилка при завантаженні</p>;

    return <NoteList notes={notes ?? []} />;
}