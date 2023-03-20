import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { BaseResponse, ErrorResponse, IModel } from '../../models/common/common';

import { GetAllUserApi } from '../../services';

export type combineUserState = IModel & BaseResponse<[], 'userData'> & ErrorResponse<null, 'userError'>;

const initialState:combineUserState = {
    isLoading: false,
    isSuccess: false,
    userData: [],
    userError: null
}

export const UserThunk = createAsyncThunk(
    'user/UserThunk',
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
    reducers: {
        defaultState(state) {
            state.isLoading=false;
            state.isSuccess=false;
            state.userError= null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(UserThunk.pending, (state: combineUserState) => {
                state.isLoading = true
            })
            .addCase(UserThunk.fulfilled,(state:combineUserState,action:AnyAction)=> {
                state.isLoading= false;
                state.isSuccess=true;
                state.userData=action.payload
            })
            .addCase(UserThunk.rejected,(state:combineUserState,action:AnyAction) => {
                state.isSuccess= false;
                state.userError=action?.error?.message
            })
    },
})

export default userSlice.reducer;
export const defaultState = userSlice.actions.defaultState