import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        isAuthenticated: false,
        firstName: null,
        lastName: null,
        userName: null,

    },
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
        },
        setProfile: (state, action) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.userName = action.payload.userName;
        },
    },
});

export const { loginSuccess, logout, setProfile } = authSlice.actions;
export default authSlice.reducer;