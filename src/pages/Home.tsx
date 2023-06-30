import { useEffect, useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';
import { setCatIndex, setCurrentPage, setUrlParams } from '../redux/filterSlice';
import { fetchPizza } from '../redux/pizzaSlice';
import { sortNames } from '../components/Sort';
import { RootState, useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
    const {
        catIndex,
        sort: selectedSort,
        currentPage: pageNumber,
    } = useSelector((state: RootState) => state.filter);

    const { items: pizzas, status } = useSelector((state: RootState) => state.pizza);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isUrlParams = useRef(false);
    const isMounted = useRef(false);

    const { searchValue } = useContext(SearchContext);

    const getPizzas = async () => {
        
        dispatch(fetchPizza({ catIndex, searchValue, selectedSort, pageNumber }));

        window.scrollTo(0, 0);
    };

    const onClickCatHandler = (i: number) => {
        dispatch(setCatIndex(i));
    };

    const setPageNumber = (i: number) => {
        dispatch(setCurrentPage(i));
    };

    // Если изменили параметры и был первый рендер
    useEffect(() => {
        if (isMounted.current) {
            const url = qs.stringify({
                sort: selectedSort.sortTitle,
                catIndex,
                pageNumber,
            });

            navigate(`?${url}`);
        }
        isMounted.current = true;
    }, [catIndex, selectedSort, pageNumber]);

    // Если был первый рендер, то проверяем URL-параметры и сохраняем в редакс
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = sortNames.find((obj) => obj.sortTitle === params.sort);
            dispatch(
                setUrlParams({
                    ...params,
                    sort,
                }),
            );
            isUrlParams.current = true;
        }
    }, []);

    // Если был первый рендер, то запрашиваем пиццы
    useEffect(() => {
        window.scrollTo(0, 0);

        if (!isUrlParams.current) {
            getPizzas();
        }

        isUrlParams.current = false;
    }, [catIndex, selectedSort, pageNumber, searchValue]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories catIndex={catIndex} onClickCat={onClickCatHandler} />
                <Sort  />
            </div>
            <h2 className="content__title">Все пиццы</h2>

            {status === 'error' ? (
                <div className='content__error'>
                    <h2>
                        Произошла ошибка 😕
                    </h2>
                    <p>
                        К сожалению не удалось получить питсы. Попробуйте повторить попытку.
                    </p>
                </div>
            ) : (
                <div className="content__items">
                    {status === 'loading'
                        ? [...new Array(4)].map((_, i) => {
                              return <Skeleton key={i} />;
                          })
                        : pizzas.map((obj) => {
                              return <PizzaBlock key={obj.id} {...obj} />;
                          })}
                </div>
            )}

            <Pagination setPageNumber={setPageNumber} />
        </div>
    );
}

export default Home;
