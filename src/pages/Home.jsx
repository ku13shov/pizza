import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';
import { setCatIndex, setSelectedSort } from '../redux/filterSlice';

function Home() {
    const { catIndex, sort: selectedSort } = useSelector((state) => state.filter);
    const dispatch = useDispatch();

    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [searchValue] = useContext(SearchContext);

    const onClickCatHandler = (i) => {
        dispatch(setCatIndex(i));
    };

    const isSelectedSortHandler = (obj) => {
        dispatch(setSelectedSort(obj));
    };

    useEffect(() => {
        setIsLoading(true);
        // fetch(
        //     `https://647de329af984710854a8ac9.mockapi.io/items?${
        //         catIndex === 0 ? '' : `category=${catIndex}`
        //     }&title=${searchValue}&sortBy=${selectedSort.sortTitle}&order=asc&p=${pageNumber}&l=4`,
        // )
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setPizzas(data);
        //         setIsLoading(false);
        //     });

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

        window.scrollTo(0, 0);
    }, [catIndex, selectedSort, pageNumber, searchValue]);

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
