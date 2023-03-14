import { LoginApi } from '../../basic-api/index';

import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BaseResponse, ErrorResponse, IModel } from '../../interface/commonInterace/interface';

import { ILogin } from "src/interface";

 export type combineLoginState = IModel & BaseResponse<[], 'loginData'> & ErrorResponse<null, 'loginError'>;

const initialState:combineLoginState = {
    isLoading: false,
    isSuccess: false,
    loginData: [],
    loginError: null, 
}

export const axiosLogin = createAsyncThunk(
    'posts/axiosLogin',
    async (values: ILogin) => {
        try {
            const response = await LoginApi(values)
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
            .addCase(axiosLogin.pending, (state: combineLoginState) => {
                state.isLoading = true;
            })
            .addCase(axiosLogin.fulfilled, (state: combineLoginState, action:AnyAction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.loginData = action.payload
            })
            .addCase(axiosLogin.rejected, (state: combineLoginState, action:AnyAction) => {
                state.isSuccess = false;
                state.loginError = action?.error?.message
            })
    },
})

export default loginSlice.reducer;