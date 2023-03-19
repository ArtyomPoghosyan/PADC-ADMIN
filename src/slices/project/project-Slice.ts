import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { Projectapi } from '../../base-URL/index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BaseResponse, ErrorResponse, IModel } from '../../models/common/common';

export type combineProjectState = IModel & BaseResponse<[], 'projectData'> & ErrorResponse<null, 'projectError'>;

const initialState: combineProjectState = {
    isLoading: false,
    isSuccess: false,
    projectData: [],
    projectError: null
}

export const axiosProject = createAsyncThunk(
    "project/axiosProject",
    async () => {
        try {
            const response = await Projectapi();
            return Promise.resolve(response.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
)

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(axiosProject.pending, (state: combineProjectState) => {
                state.isLoading = true
            })
            .addCase(axiosProject.fulfilled, (state: combineProjectState, action:AnyAction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.projectData = action.payload
            })
            .addCase(axiosProject.rejected, (state: combineProjectState, action:AnyAction) => {
                state.isSuccess = false;
                state.projectError = action?.error?.message
            })
    },
})

export default projectSlice.reducer;