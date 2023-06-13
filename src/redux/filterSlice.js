import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    catIndex: 0,
    sort: {
        sortName: 'популярности',
        sortTitle: 'rating',
    },
    currentPage: 1,
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCatIndex(state, actions) {
            state.catIndex = actions.payload;
        },

        setSelectedSort(state, actions) {
            state.sort = actions.payload;
        },
        
        setCurrentPage(state, actions) {
            state.currentPage = actions.payload;
        }
    },
});


export const { setCatIndex, setSelectedSort, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
