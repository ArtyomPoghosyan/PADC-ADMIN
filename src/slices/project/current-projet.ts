import { currentProjectAPi } from '../../services';

import { createAsyncThunk, createSlice, AnyAction } from '@reduxjs/toolkit';
import { BaseResponse, ErrorResponse, IModel } from '../../models/common';

type combineVacancieState = IModel & BaseResponse<[], 'currentProjectData'> & ErrorResponse<null, 'currentProjectError'>;

const initialState: combineVacancieState = {
    isLoading: false,
    isSuccess: false,
    currentProjectData: [],
    currentProjectError: null
}

export const CurrentProjectThunk = createAsyncThunk(
    "currentProject/axiosCurrentProject",
    async (id:any) => {
        try {
            const response = await currentProjectAPi(id);
            return Promise.resolve(response.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
)

const currentProjectSlice = createSlice({
    name: "currentProject",
    initialState,
    reducers: {
        defaultState(state) {
            state.isLoading = false;
            state.isSuccess = false;
            state.currentProjectError = null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(CurrentProjectThunk.pending, (state: combineVacancieState) => {
                state.isLoading = true
            })
            .addCase(CurrentProjectThunk.fulfilled, (state: combineVacancieState, action: AnyAction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentProjectData = action.payload
            })
            .addCase(CurrentProjectThunk.rejected, (state: combineVacancieState, action: AnyAction) => {
                state.isSuccess = false;
                state.currentProjectError = action?.error?.message
            })
    },
})

export default currentProjectSlice.reducer;
export const defaulsTate = currentProjectSlice.actions.defaultState