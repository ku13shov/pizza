import React, { useState, useEffect, useContext, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';
import { setCatIndex, setSelectedSort, setCurrentPage, setUrlParams } from '../redux/filterSlice';
import { sortNames } from '../components/Sort';

function Home() {
    const {
        catIndex,
        sort: selectedSort,
        currentPage: pageNumber,
    } = useSelector((state) => state.filter);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isUrlParams = useRef(false);

    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchValue] = useContext(SearchContext);

    const fetchPizzas = () => {
        setIsLoading(true);
        axios
            .get(
                `https://647de329af984710854a8ac9.mockapi.io/items?${
                    catIndex === 0 ? '' : `category=${catIndex}`
                }&title=${searchValue}&sortBy=${
                    selectedSort.sortTitle
                }&order=asc&p=${pageNumber}&l=4`,
            )
            .then((res) => {
                setPizzas(res.data);
                setIsLoading(false);
            });
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

    useEffect(() => {
        window.scrollTo(0, 0);

        if (!isUrlParams.current) {
            fetchPizzas();
        }

        isUrlParams.current = false;
    }, [catIndex, selectedSort, pageNumber, searchValue]);

    useEffect(() => {
        const url = qs.stringify({
            sort: selectedSort.sortTitle,
            catIndex,
            pageNumber,
        });

        navigate(`?${url}`);
    }, [catIndex, selectedSort, pageNumber]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories catIndex={catIndex} onClickCat={onClickCatHandler} />
                <Sort onClickSort={(obj) => isSelectedSortHandler(obj)} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
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
