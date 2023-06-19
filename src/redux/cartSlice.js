import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    totalPrice: 0,
    items: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // addItems(state, actions) {
        //     state.items.push(actions.payload);
        //     state.totalPrice = state.items.reduce((sum, item) => {
        //         return item.price + sum;
        //     }, 0)
        // },
        addItems(state, actions) {
            const findItem = state.items.find((obj) => obj.id === actions.payload.id);

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...actions.payload,
                    count: 1,
                });
            }

            state.totalPrice = state.items.reduce((sum, item) => item.price * item.count + sum, 0);
        },
        minusItems(state, actions) {
            const findItem = state.items.find((obj) => obj.id === actions.payload);

            if (findItem) {
                findItem.count--;
            }
        },
        removeItem(state, actions) {
            state.items = state.items.filter((obj) => obj.id !== actions.payload);

            state.totalPrice = state.items.reduce((sum, item) => item.price * item.count + sum, 0);
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

export const { addItems, removeItem, clearItems, minusItems } = cartSlice.actions;

export default cartSlice.reducer;
