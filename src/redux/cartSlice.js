import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    totalPrice: 0,
    items: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItems(state, actions) {
            state.items.push(actions.payload);
        },
        removeItems(state, actions) {
            state.items.filter(obj => obj.id === actions.payload);
        },
        clearItems(state) {
            state.items = [];
        }
    },
});


export const { addItems, removeItems, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
