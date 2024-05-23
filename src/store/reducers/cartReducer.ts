import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICart } from '../../models/type';


interface ICartReducer {
    cart: ICart[]

}

const initialState: ICartReducer = {
    cart: []

};


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setDataCart(state, action: PayloadAction<ICart[]>) {
            state.cart = action.payload;
        }
    },
});

export default cartSlice.reducer;
export const { setDataCart } = cartSlice.actions;