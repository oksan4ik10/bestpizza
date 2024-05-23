import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICart } from '../../models/type';


interface ICartReducer {
    cart: ICart[],
    totalPrice: number

}

const initialState: ICartReducer = {
    cart: [],
    totalPrice: 0

};


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setDataCart(state, action: PayloadAction<ICartReducer>) {
            state.cart = action.payload.cart;
            state.totalPrice = action.payload.totalPrice;
        }
    },
});

export default cartSlice.reducer;
export const { setDataCart } = cartSlice.actions;