import { Routes, Route } from 'react-router-dom';
import { useState, createContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './redux/counterSlice';

import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';

export const SearchContext = createContext('');

function App() {
    const [searchValue, setSearchValue] = useState('');
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <SearchContext.Provider value={[searchValue, setSearchValue]}>
            <div className="wrapper">
                <Header />

                <div>
                    <div>
                        <button aria-label="Increment value" onClick={() => dispatch(increment())}>
                            Increment
                        </button>
                        <span>{count}</span>
                        <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
                            Decrement
                        </button>
                    </div>
                </div>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </SearchContext.Provider>
    );
}

export default App;
