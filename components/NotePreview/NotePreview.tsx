import { Note } from '@/types/note';

interface Props {
    note: Note;
}

export default function NotePreview({ note }: Props) {
    return (
        <div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <p><em>#{note.tag}</em></p>
        </div>
    );
}