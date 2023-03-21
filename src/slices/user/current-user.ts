import { BaseResponse, ErrorResponse, IModel } from '@models/common';
import { createSlice, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { getCurrentUser } from '@services/user';
// import { BaseResponse, ErrorResponse, IModel } from "../../models/common";
// import { getCurrentUser } from "../../services";

export type CombineUserState = IModel & BaseResponse<[], 'userData'> & ErrorResponse<null, 'userError'>;

const initialState: CombineUserState = {
    isLoading: false,
    isSuccess: false,
    userData: [],
    userError: null
}

export const CurrentUserThunk = createAsyncThunk(
    "cuurentUser/axiosCurrentUser",
    async (id: undefined | string) => {
        try {
            const repsonse = await getCurrentUser(id);
            return Promise.resolve(repsonse.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
)
const currentUserSlice = createSlice({
    name: "currentUserSlice",
    initialState,
    reducers: {
        currentUserState(state) {
            state.isLoading = false
            state.isSuccess = false
            state.userError = null
        }
    },
    extraReducers(builder) {
        builder
            .addCase(CurrentUserThunk.pending, (state: CombineUserState) => {
                state.isLoading = true
            })
            .addCase(CurrentUserThunk.fulfilled, (state: CombineUserState, action: AnyAction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.userData = action.payload
            })
            .addCase(CurrentUserThunk.rejected, (state: CombineUserState, action: AnyAction) => {
                state.isSuccess = false;
                    state.userError = action?.error?.message
            })
    },
})

export default currentUserSlice.reducer;
export const currentUserState = currentUserSlice.actions.currentUserState;