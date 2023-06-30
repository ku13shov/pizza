import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type SelectedSort = {
    sortName: string;
    sortTitle: string;
}

type Params = {
    catIndex: number;
    searchValue: string; 
    selectedSort: SelectedSort; 
    pageNumber: number;
}

type PizzaItems = {
    id: number;
    title: string;
    imageUrl: string;
    types: number[];
    sizes: number[];
    price: number;
}

export const fetchPizza = createAsyncThunk('pizza/fetchPizzaStatus', async (params: Params) => {
    const { catIndex, searchValue, selectedSort, pageNumber } = params;
    const { data } = await axios.get<PizzaItems[]>(
        `https://647de329af984710854a8ac9.mockapi.io/items?${
            catIndex === 0 ? '' : `category=${catIndex}`
        }&title=${searchValue}&sortBy=${selectedSort.sortTitle}&order=asc&p=${pageNumber}&l=4`,
    );
    return data as PizzaItems[];
});

interface PizzaSliceState {
    items: PizzaItems[];
    status: 'loading' | 'success' | 'error';
}

const initialState: PizzaSliceState = {
    items: [],
    status: 'loading', // loading, success, error
};

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchPizza.pending, (state) => {
            state.status = 'loading';
            state.items = [];
        });
        builder.addCase(fetchPizza.fulfilled, (state, action) => {
            state.status = 'success';
            state.items = action.payload;
        });
        builder.addCase(fetchPizza.rejected, (state) => {
            state.status = 'error';
            state.items = [];
        });
    },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
