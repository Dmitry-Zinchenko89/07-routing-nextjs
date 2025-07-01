import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';
import { getNoteById } from '@/lib/api';

interface Props {
    params: { id: string };
}

export default async function NoteModalPage({ params }: Props) {
    const note = await getNoteById(params.id);

    return (
        <Modal>
            <NotePreview note={note} />
        </Modal>
    );
}