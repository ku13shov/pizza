import { createSlice } from '@reduxjs/toolkit';

type Sort = {
    sortName: string;
    sortTitle: 'rating' | 'price' | 'title';
}

interface FilterSliceState {
    catIndex: number;
    currentPage: number;
    sort: Sort;
}

const initialState: FilterSliceState = {
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
        setCatIndex(state, action) {
            state.catIndex = action.payload;
        },

        setSelectedSort(state, action) {
            state.sort = action.payload;
        },
        
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },

        setUrlParams(state, action) {
            state.catIndex = Number(action.payload.catIndex)
            state.currentPage = Number(action.payload.pageNumber)
            state.sort = action.payload.sort
        }
    },
});


export const { setCatIndex, setSelectedSort, setCurrentPage, setUrlParams } = filterSlice.actions;

export default filterSlice.reducer;
