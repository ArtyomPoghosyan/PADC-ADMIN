import { createAsyncThunk, createSlice, AnyAction } from '@reduxjs/toolkit';
import { BaseResponse, ErrorResponse, IModel } from "@models/common";
import { deleteProject } from '@services/project';
import { axiosProject } from './project';
import axios from 'axios';

type CombineProjectState = IModel & BaseResponse<[], 'ProjectData'> & ErrorResponse<null, 'ProjectError'>;

const initialState: CombineProjectState = {
    isLoading: false,
    isSuccess: false,
    ProjectData: [],
    ProjectError: null
}

export const deleteProjectThunk = createAsyncThunk(
    "deleteProject/deleteProjectThunk",
    async (id: undefined | number, { fulfillWithValue, dispatch }) => {
        try {
            const response = await deleteProject(id);
            dispatch(axiosProject())
            return fulfillWithValue(response.data)

        } catch (error: unknown) {
            if (axios.isAxiosError(error))
                return Promise.reject(error?.response?.data?.error?.message[0])
        }
    }
)

const deleteProjectSlice = createSlice({
    name: "deleteProject",
    initialState,
    reducers: {
        deleteProject(state: CombineProjectState) {
            state.isLoading = false
            state.isSuccess = false
            state.ProjectError = null
        }
    },
    extraReducers(builder) {
        builder
            .addCase(deleteProjectThunk.pending, (state: CombineProjectState) => {
                state.isLoading = true
            })
            .addCase(deleteProjectThunk.fulfilled, (state: CombineProjectState, action: AnyAction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.ProjectData = action.payload
            })
            .addCase(deleteProjectThunk.rejected, (state: CombineProjectState, action: AnyAction) => {
                state.isSuccess = true;
                state.ProjectError = action?.error?.message
            })
    },
})

export default deleteProjectSlice.reducer;
export const deleteProjectState = deleteProjectSlice.actions.deleteProject