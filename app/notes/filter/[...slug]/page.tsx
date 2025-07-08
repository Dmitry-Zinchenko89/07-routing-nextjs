import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

type Props = {
    params: Promise<{ slug: string[] }>;
};

export default async function Page({ params }: Props) {
    const { slug } = await params;

    const tag = decodeURIComponent(slug.join('/'));
    const page = 1;
    const search = '';

    const data = await fetchNotes({ page, search, tag });

    return <NotesClient tag={tag} initialData={data} />;
}