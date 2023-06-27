import { useContext, useRef, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import { SearchContext } from '../../App';

const Search: React.FC = () => {
    const {setSearchValue} = useContext(SearchContext);
    const [localSearchValue, setLocalSearchValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const clearAndFocusInput = () => {
        setSearchValue('');
        setLocalSearchValue('');
        inputRef.current?.focus();
    };

    const updateSearchValue = useCallback(
        debounce((localSearchValue) => {
            setSearchValue(localSearchValue);
        }, 180),
        [],
    );

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearchValue(e.target.value);
        updateSearchValue(e.target.value);
    }

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
            <input
                ref={inputRef}
                className={styles.input}
                type="text"
                placeholder="Поиск пиццы..."
                onChange={onChangeInput}
                value={localSearchValue}
            />

            {localSearchValue && (
                <svg
                    className={styles.close}
                    onClick={clearAndFocusInput}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z" />
                    <path d="M16.707,7.293a1,1,0,0,0-1.414,0L12,10.586,8.707,7.293A1,1,0,1,0,7.293,8.707L10.586,12,7.293,15.293a1,1,0,1,0,1.414,1.414L12,13.414l3.293,3.293a1,1,0,0,0,1.414-1.414L13.414,12l3.293-3.293A1,1,0,0,0,16.707,7.293Z" />
                </svg>
            )}
        </div>
    );
}

export default Search;
