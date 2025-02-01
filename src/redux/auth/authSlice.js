import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        user: {},
        token: ""
    },
    reducers: {
        login: (state, action) => {
            const { token , user } = action.payload
            state.isLoggedIn = true;
            state.user = user;
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