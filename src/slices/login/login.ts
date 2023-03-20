import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { BaseResponse, ErrorResponse, IModel } from '../../models/common/common';
import { ILogin } from '../../models/auth';

import { Login } from "../../services";

export type CombineLoginState = IModel & BaseResponse<[], 'loginData'> & ErrorResponse<null, 'loginError'>;

const initialState: CombineLoginState = {
    isLoading: false,
    isSuccess: false,
    loginData: [],
    loginError: null,
}

export const LoginThunk = createAsyncThunk(
    'posts/axiosLogin',
    async (values: ILogin) => {
        try {
            const response = await Login(values)
            return Promise.resolve(response.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
)

const loginSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(LoginThunk.pending, (state: CombineLoginState) => {
                state.isLoading = true;
            })
            .addCase(LoginThunk.fulfilled, (state: CombineLoginState, action: AnyAction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.loginData = action.payload
            })
            .addCase(LoginThunk.rejected, (state: CombineLoginState, action: AnyAction) => {
                state.isSuccess = false;
                state.loginError = action?.error?.message
            })
    },
})

export default loginSlice.reducer;