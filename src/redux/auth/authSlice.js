import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        user: {},
        token: "",
        payment: {}
    },
    reducers: {
        login: (state, action) => {
            const { token, user, payment } = action.payload
            state.isLoggedIn = true;
            state.user = user;
            state.payment = payment;
            state.token = token;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = {};
            state.token = "";
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;