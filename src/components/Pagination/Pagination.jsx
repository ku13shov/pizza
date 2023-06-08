import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

function Pagination({setPageNumber}) {
    return (
        <ReactPaginate
            className={styles.pagination}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(e) => setPageNumber(e.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
}

export default Pagination;
