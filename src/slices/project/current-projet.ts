import { BaseResponse, ErrorResponse, IModel } from '@models/common';
import { createAsyncThunk, createSlice, AnyAction } from '@reduxjs/toolkit';
import { currentProject } from '@services/project';
import axios from 'axios';

type CombineProjectState = IModel & BaseResponse<[], 'currentProjectData'> & ErrorResponse<null, 'currentProjectError'>;

const initialState: CombineProjectState = {
    isLoading: false,
    isSuccess: false,
    currentProjectData: [],
    currentProjectError: null
}

export const CurrentProjectThunk = createAsyncThunk(
    "currentProject/axiosCurrentProject",
    async (id: undefined | string) => {
        try {
            const response = await currentProject(id);
            return Promise.resolve(response.data)
        } catch (error: unknown) {
            if (axios.isAxiosError(error))
                return Promise.reject(error?.response?.data?.error?.message[0])
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
            .addCase(CurrentProjectThunk.pending, (state: CombineProjectState) => {
                state.isLoading = true
            })
            .addCase(CurrentProjectThunk.fulfilled, (state: CombineProjectState, action: AnyAction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentProjectData = action.payload
            })
            .addCase(CurrentProjectThunk.rejected, (state: CombineProjectState, action: AnyAction) => {
                state.isSuccess = false;
                state.currentProjectError = action?.error?.message
            })
    },
})

export default currentProjectSlice.reducer;
export const defaulsTate = currentProjectSlice.actions.defaultState