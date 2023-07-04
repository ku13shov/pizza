import { CartItems } from "../redux/cartSlice";

export const calcTotalPrice = (items: CartItems[]) => {
    return items.reduce((sum, item) => item.price * item.count + sum, 0);
}