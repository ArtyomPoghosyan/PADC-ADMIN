import { createAsyncThunk, createSlice, AnyAction } from '@reduxjs/toolkit';

import { BaseResponse, ErrorResponse, IModel } from '@models/common';
import { IAddProject } from '@models/projects';

import { addProject } from '@services/project';

import axios from 'axios';

type CombineEditProjectResetState = IModel & BaseResponse<[], 'addProjectData'> & ErrorResponse<null, 'addProjectDataError'>;

const initialState: CombineEditProjectResetState = {
    isLoading: false,
    isSuccess: false,
    addProjectData: [],
    addProjectDataError: null
}

export const AddProjectThunk = createAsyncThunk(
    "addProject/axiosAddProject",
    async (data: IAddProject) => {
        try {
            const response = await addProject(data);
            return Promise.resolve(response.data)
        } catch (error: unknown) {
            if (axios.isAxiosError(error))
                return Promise.reject(error?.response?.data?.error?.message[0])
        }
    }
)

const addProjectSlice = createSlice({
    name: "addProject",
    initialState,
    reducers: {
        addProjectResetState(state) {
            state.isLoading = false;
            state.isSuccess = false;
            state.addProjectDataError = null
        }
    },
    extraReducers(builder) {
        builder
            .addCase(AddProjectThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(AddProjectThunk.fulfilled, (state: CombineEditProjectResetState, action: AnyAction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.addProjectData = action.payload
            })
            .addCase(AddProjectThunk.rejected, (state: CombineEditProjectResetState, action: AnyAction) => {
                state.isSuccess = false;
                    state.addProjectDataError = action?.error?.message
            })
    },
})

export default addProjectSlice.reducer;
export const addProjectResetState= addProjectSlice.actions.addProjectResetState;