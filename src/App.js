import React, { useState, useEffect } from 'react';
import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import Skeleton from './components/PizzaBlock/Skeleton';

function App() {
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://demo6119268.mockable.io')
            .then((res) => res.json())
            .then((data) => {
                setPizzas(data);
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories />
                        <Sort />
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {
                            isLoading ? [...new Array(6)].map((_, i) => {
                                return <Skeleton key={i} />;
                            }) : pizzas.map((obj) => {
                                return <PizzaBlock key={obj.id} {...obj} />;
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
