'use client';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

export default function CreateNoteModalPage() {
    return (
        <Modal onClose={() => history.back()}>
            <NoteForm onClose={() => history.back()} />
        </Modal>
    );
}