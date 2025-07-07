import NoteDetails from './NoteDetails.client';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const parsedId = Number(id);

    return <NoteDetails id={parsedId} />;
}