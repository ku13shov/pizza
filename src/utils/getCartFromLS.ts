import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart');
    if (data) {
        return {
            totalPrice: calcTotalPrice(JSON.parse(data)),
            items: JSON.parse(data)
        }
    }
    
    return {
        totalPrice: 0,
        items: []
    }
}