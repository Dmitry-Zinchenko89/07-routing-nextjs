import { TagsMenu } from '../TagsMenu/TagsMenu';
import css from './Header.module.css'

export const Header = () => {
    return (
        <header className={css.header}>
            <TagsMenu />
            {/* решта елементів */}
        </header>
    );
};