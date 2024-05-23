import { PayloadAction, createSlice } from '@reduxjs/toolkit';


export interface ICountCard {
    count: number
}

const initialState: ICountCard = {
    count: 0
};




export const countSlice = createSlice({
    name: 'countCart',
    initialState,
    reducers: {
        setCount(state, action: PayloadAction<number>) {
            state.count = action.payload;
        },
    },
});

export default countSlice.reducer;
export const { setCount } = countSlice.actions;