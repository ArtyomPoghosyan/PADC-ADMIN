import { ILogin } from "@models/auth";
import { BaseResponse, ErrorResponse, IModel } from "@models/common";
import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Login } from "@services/auth";
import axios from "axios";

export type CombineLoginresetState = IModel & BaseResponse<[], 'loginData'> & ErrorResponse<null, 'loginError'>;

const initialState: CombineLoginresetState = {
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
            return Promise.resolve(response?.data)
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                return Promise.reject(error?.response?.data?.error?.message[0])
            }
        }
    }
)

const loginSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        LoginResetState(state){
            state.isLoading=false;
            state.isSuccess= false;
            state.loginError = null
        }
    },
    extraReducers(builder) {
        builder
            .addCase(LoginThunk.pending, (state: CombineLoginresetState) => {
                state.isLoading = true;
            })
            .addCase(LoginThunk.fulfilled, (state: CombineLoginresetState, action: AnyAction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.loginData = action?.payload
            })
            .addCase(LoginThunk.rejected, (state: CombineLoginresetState, action: AnyAction) => {
                state.isSuccess = false;
                state.loginError = action?.error?.message
            })
    },
})

export default loginSlice.reducer;
export const  LoginresetState = loginSlice.actions.LoginResetState;