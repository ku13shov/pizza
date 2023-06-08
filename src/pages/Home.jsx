import React, { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';

function Home() {
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [catIndex, setCatIndex] = useState(0);
    const [selectedSort, isSelectedSort] = useState({
        sortName: 'популярности',
        sortTitle: 'rating',
    });
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        setIsLoading(true);
        fetch(
            `https://647de329af984710854a8ac9.mockapi.io/items?${catIndex === 0 ? '' : `category=${catIndex}`}&sortBy=${selectedSort.sortTitle}&order=asc&p=${pageNumber}&l=4`,
        )
            .then((res) => res.json())
            .then((data) => {
                setPizzas(data);
                setIsLoading(false);
            });

        window.scrollTo(0, 0);
    }, [catIndex, selectedSort, pageNumber]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories catIndex={catIndex} onClickCat={(i) => setCatIndex(i)} />
                <Sort selectedSort={selectedSort} onClickSort={(obj) => isSelectedSort(obj)} />
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
