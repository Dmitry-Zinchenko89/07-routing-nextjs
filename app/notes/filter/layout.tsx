import css from './layout.module.css';

type LayoutNotesProps = {
    children: React.ReactNode;
    sidebar: React.ReactNode;
    modal?: React.ReactNode;
};

export default function LayoutNotes({
    children,
    sidebar,
    modal,
}: LayoutNotesProps) {
    return (
        <section className={css.container}>
            <aside className={css.sidebar}>{sidebar}</aside>
            <div className={css.notesWrapper}>{children}</div>
            {modal}
        </section>
    );
}
