export const addDecimals = (num) => (Math.round(num * 100)/100).toFixed(2);

export const updateCart = (state) => {
    // Calculate the items price
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    // Calculate the shipping price (if order over $100 then free, else $10)
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
    // Calculate the tax price (15%)
    state.taxPrice = addDecimals(0.15 * Number(state.itemsPrice));
    // Calculate the total price
    state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);

    localStorage.setItem('cart', JSON.stringify(state));

    return state;
}