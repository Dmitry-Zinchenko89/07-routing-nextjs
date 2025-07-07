import { Note } from '@/types/note';

interface NoteListProps {
    items: Note[];
}

export default function NoteList({ items }: NoteListProps) {
    return (
        <ul>
            {items.map((note) => (
                <li key={note.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                    <small>#{note.tag}</small>
                </li>
            ))}
        </ul>
    );
}