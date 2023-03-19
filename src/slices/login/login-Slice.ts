import { Login } from '../../base-URL/index';

import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BaseResponse, ErrorResponse, IModel } from '../../models/common/common';
import { ILogin } from '../../models/auth';



export type combineLoginState = IModel & BaseResponse<[], 'loginData'> & ErrorResponse<null, 'loginError'>;

const initialState: combineLoginState = {
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
            .addCase(LoginThunk.pending, (state: combineLoginState) => {
                state.isLoading = true;
            })
            .addCase(LoginThunk.fulfilled, (state: combineLoginState, action: AnyAction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.loginData = action.payload
            })
            .addCase(LoginThunk.rejected, (state: combineLoginState, action: AnyAction) => {
                state.isSuccess = false;
                state.loginError = action?.error?.message
            })
    },
})

export default loginSlice.reducer;