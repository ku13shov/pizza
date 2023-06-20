import React, { useState, useEffect, useContext, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';
import { setCatIndex, setSelectedSort, setCurrentPage, setUrlParams } from '../redux/filterSlice';
import { fetchPizza } from '../redux/pizzaSlice';
import { sortNames } from '../components/Sort';

function Home() {
    const {
        catIndex,
        sort: selectedSort,
        currentPage: pageNumber,
    } = useSelector((state) => state.filter);

    const {items: pizzas, status } = useSelector((state) => state.pizza);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isUrlParams = useRef(false);
    const isMounted = useRef(false);

    const { searchValue } = useContext(SearchContext);

    const getPizzas = async () => {
        dispatch(fetchPizza({ catIndex, searchValue, selectedSort, pageNumber }));

        window.scrollTo(0, 0);
    };

    const onClickCatHandler = (i) => {
        dispatch(setCatIndex(i));
    };

    const isSelectedSortHandler = (obj) => {
        dispatch(setSelectedSort(obj));
    };

    const setPageNumber = (i) => {
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
                <Sort onClickSort={(obj) => isSelectedSortHandler(obj)} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {status === 'loading'
                    ? [...new Array(4)].map((_, i) => {
                          return <Skeleton key={i} />;
                      })
                    : pizzas.map((obj) => {
                          return <PizzaBlock key={obj.id} {...obj} />;
                      })}
            </div>

            <Pagination setPageNumber={setPageNumber} />
        </div>
    );
}

export default Home;
