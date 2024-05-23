import { PayloadAction, createSlice } from '@reduxjs/toolkit';


export interface IUser {
    token: string;
    name: string;
    phone: string;
    email: string

}

const initialState: IUser = {
    token: "",
    name: "",
    phone: "",
    email: ""

};




export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
        setDataUser(state, action: PayloadAction<IUser>) {
            console.log(action.payload);

            state.token = action.payload.token;
            state.name = action.payload.name;
            state.phone = action.payload.phone;
        },
    },
});

export default userSlice.reducer;
export const { setToken, setDataUser } = userSlice.actions;