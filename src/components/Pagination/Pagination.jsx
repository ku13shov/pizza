import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';

import styles from './Pagination.module.scss';

function Pagination({setPageNumber}) {
    const {
        currentPage: pageNumber,
    } = useSelector((state) => state.filter);
    
    return (
        <ReactPaginate
            className={styles.pagination}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(e) => {setPageNumber(e.selected + 1)}}
            pageRangeDisplayed={4}
            pageCount={3}
            previousLabel="<"
            renderOnZeroPageCount={null}
            forcePage={pageNumber - 1}
        />
    );
}

export default Pagination;
