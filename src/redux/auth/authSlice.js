import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        token: ""
    },
    reducers: {
        login: (state, action) => {
            const { token } = action.payload
            state.isLoggedIn = true;
            state.token = token;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.token = "";
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;