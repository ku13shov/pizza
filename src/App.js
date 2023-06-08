import { Routes, Route } from 'react-router-dom';
import { useState, createContext } from 'react';

import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';

export const SearchContext = createContext('');

function App() {
    const [searchValue, setSearchValue] = useState('');

    return (
        <SearchContext.Provider value={[searchValue, setSearchValue]}>
            <div className="wrapper">
                <Header />
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
