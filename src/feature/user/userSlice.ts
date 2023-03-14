import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { GetAllUserApi } from '../../basic-api/index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BaseResponse, ErrorResponse, IModel } from '../../interface/commonInterace/interface';

export type combineUserState = IModel & BaseResponse<[], 'userData'> & ErrorResponse<null, 'userError'>;

const initialState:combineUserState = {
    isLoading: false,
    isSuccess: false,
    userData: [],
    userError: null
}

export const axiosUser = createAsyncThunk(
    'user/axiosUser',
    async () => {
        try {
            const response = await GetAllUserApi()
            return Promise.resolve(response.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(axiosUser.pending, (state: combineUserState) => {
                state.isLoading = true
            })
            .addCase(axiosUser.fulfilled,(state:combineUserState,action:AnyAction)=> {
                state.isLoading= false;
                state.isSuccess=true;
                state.userData=action.payload
            })
            .addCase(axiosUser.rejected,(state:combineUserState,action:AnyAction) => {
                state.isSuccess= false;
                state.userError=action?.error?.message
            })
    },
})

export default userSlice.reducer;