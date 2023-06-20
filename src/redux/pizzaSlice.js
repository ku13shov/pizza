import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizza = createAsyncThunk('pizza/fetchPizzaStatus', async (params) => {
    const { catIndex, searchValue, selectedSort, pageNumber } = params;
    const { data } = await axios.get(
        `https://647de329af984710854a8ac9.mockapi.io/items?${
            catIndex === 0 ? '' : `category=${catIndex}`
        }&title=${searchValue}&sortBy=${selectedSort.sortTitle}&order=asc&p=${pageNumber}&l=4`,
    );
    return data;
});

const initialState = {
    items: [],
    status: 'loading', // loading, success, error
};

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, actions) {
            state.items = actions.payload;
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
