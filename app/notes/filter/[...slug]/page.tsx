import { notFound } from 'next/navigation';
import Notes from './Notes.client';

interface Props {
    params: {
        slug: string[];
    };
}

export default async function FilteredNotesPage({ params }: Props) {

    const tag = params.slug[0] === 'All' ? undefined : params.slug[0];

    if (!params.slug) {
        notFound();
    }

    return <Notes tag={tag} />;
}