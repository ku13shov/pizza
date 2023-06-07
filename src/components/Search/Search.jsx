import styles from './Search.module.scss';

function Search() {
    return (
        <div className={styles.wrapper}>
            <svg
                className={styles.search}
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" x2="16.65" y1="21" y2="16.65" />
            </svg>
            <input className={styles.input} type="text" placeholder="Поиск пиццы..." />
        </div>
    );
}

export default Search;
