import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import styles from './Pagination.module.scss';

type PaginationProps = {
    setPageNumber: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({setPageNumber}) => {
    const {
        currentPage: pageNumber,
    } = useSelector((state: RootState) => state.filter);
    
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
