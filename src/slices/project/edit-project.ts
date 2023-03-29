// import { editCurentProject } from '../../services';

import { BaseResponse, ErrorResponse, IModel } from '@models/common';
import { IProject } from '@models/projects';
import { createAsyncThunk, createSlice, AnyAction } from '@reduxjs/toolkit';
import { editCurentProject } from '@services/project';
import axios from 'axios';
// import { BaseResponse, ErrorResponse, IModel } from '../../models/common';

type CombineProjectState = IModel & BaseResponse<[], 'currentProjectData'> & ErrorResponse<null, 'currentProjectError'>;

const initialState: CombineProjectState = {
    isLoading: false,
    isSuccess: false,
    currentProjectData: [],
    currentProjectError: null
}

export const EditCurrentProjectThunk = createAsyncThunk(
    "editcurrentProject/axiosEditCurrentProject",
    async ({ id, data }: IProject) => {
        try {
            const response = await editCurentProject(id, data);
            return Promise.resolve(response.data)
        } catch (error: unknown) {
            if (axios.isAxiosError(error))
                return Promise.reject(error?.response?.data?.error?.message[0])
        }
    }
)

const editCurrentProjectSlice = createSlice({
    name: "editcurrentProject",
    initialState,
    reducers: {
        ProjectState(state) {
            state.isLoading = false;
            state.isSuccess = false;
            state.currentProjectError = null
        }
    },
    extraReducers(builder) {
        builder
            .addCase(EditCurrentProjectThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(EditCurrentProjectThunk.fulfilled, (state: CombineProjectState, action: AnyAction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentProjectData = action.payload
            })
            .addCase(EditCurrentProjectThunk.rejected, (state: CombineProjectState, action: AnyAction) => {
                state.isSuccess = false;
                state.currentProjectError = action?.error?.message;
            })
    },
})

export default editCurrentProjectSlice.reducer;
export const ProjectState = editCurrentProjectSlice.actions.ProjectState;

