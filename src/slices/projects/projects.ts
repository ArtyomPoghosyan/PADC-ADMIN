import { BaseResponse, ErrorResponse, IModel } from '@models/common';
import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Project } from '@services/project';
import axios from 'axios';

export type combineEditProjectResetState = IModel & BaseResponse<[], 'projectData'> & ErrorResponse<null, 'projectError'>;

const initialState: combineEditProjectResetState = {
    isLoading: false,
    isSuccess: false,
    projectData: [],
    projectError: null
}

export const axiosProject = createAsyncThunk(
    "project/axiosProject",
    async () => {
        try {
            const response = await Project();
            return Promise.resolve(response.data)
        } catch (error: unknown) {
            if (axios.isAxiosError(error))
                return Promise.reject(error?.response?.data?.error?.message[0])
        }
    }
)

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(axiosProject.pending, (state: combineEditProjectResetState) => {
                state.isLoading = true
            })
            .addCase(axiosProject.fulfilled, (state: combineEditProjectResetState, action: AnyAction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.projectData = action.payload
            })
            .addCase(axiosProject.rejected, (state: combineEditProjectResetState, action: AnyAction) => {
                state.isSuccess = false;
                state.projectError = action?.error?.message
            })
    },
})

export default projectSlice.reducer;