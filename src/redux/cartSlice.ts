import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLS } from '../utils/getCartFromLS';

export type CartItems = {
    id: number;
    title: string;
    count: number;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
};

interface CartSliceState {
    totalPrice: number;
    items: CartItems[];
}

const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
    totalPrice,
    items,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // addItems(state, action) {
        //     state.items.push(action.payload);
        //     state.totalPrice = state.items.reduce((sum, item) => {
        //         return item.price + sum;
        //     }, 0)
        // },
        addItems(state, action: PayloadAction<CartItems>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id);

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }

            state.totalPrice = state.items.reduce((sum, item) => item.price * item.count + sum, 0);
        },
        minusItems(state, action: PayloadAction<number>) {
            const findItem = state.items.find((obj) => obj.id === action.payload);

            if (findItem) {
                findItem.count--;
            }
        },
        removeItem(state, action: PayloadAction<number>) {
            state.items = state.items.filter((obj) => obj.id !== action.payload);

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
