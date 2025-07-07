'use client';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';

import css from './NotesPage.module.css';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import { redirect } from 'next/navigation';

type Props = {
    tag?: string;
};

export default function NotesClient({ tag }: Props) {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [debouncedQuery] = useDebounce(search, 500);

    const { data, isSuccess } = useQuery({
        queryKey: ['notes', debouncedQuery, page, tag],
        queryFn: () => fetchNotes({ search: debouncedQuery, page, tag }),
        placeholderData: (prev) => prev,
    });

    const handleSearch = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    return (
        <div className={css.app}>
            <div className={css.toolbar}>
                <SearchBox onChange={handleSearch} value={search} />

                {isSuccess && data.totalPages > 1 && (
                    <Pagination
                        currentPage={page}
                        totalPages={data.totalPages}
                        onPageChange={setPage}
                    />
                )}

                <button
                    className={css.button}
                    onClick={() => {
                        redirect('/');
                    }}
                >
                    Create note +
                </button>
            </div>

            {isSuccess && data.notes.length > 0 && (
                <NoteList items={data.notes} />
            )}
        </div>
    );
}