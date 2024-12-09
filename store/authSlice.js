import { createReducer,createSlice } from "@reduxjs/toolkit";
import React from 'react'

const initialState = {
    status: false,
    userData: null,
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state,action) => {
            // console.log("data de diya userdata me ",action.payload);
            
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
    }
})
export const { login,logout } = authSlice.actions;
export default authSlice.reducer