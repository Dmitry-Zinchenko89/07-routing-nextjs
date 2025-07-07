import NotesClient from './Notes.client';

type Props = {
    params: Promise<{ slug?: string[] }>;
};

export default async function Page({ params }: Props) {
    const { slug } = await params;
    const tag = Array.isArray(slug) ? slug[0] : undefined;

    return <NotesClient tag={tag} />;
}