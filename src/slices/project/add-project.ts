import { BaseResponse, ErrorResponse, IModel } from '@models/common';
import { IAddProject } from '@models/projects';
import { createAsyncThunk, createSlice, AnyAction } from '@reduxjs/toolkit';
import { addProject } from '@services/project';
import axios from 'axios';

type CombineProjectState = IModel & BaseResponse<[], 'addProjectData'> & ErrorResponse<null, 'addProjectDataError'>;

const initialState: CombineProjectState = {
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
        defaultState(state) {
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
            .addCase(AddProjectThunk.fulfilled, (state: CombineProjectState, action: AnyAction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.addProjectData = action.payload
            })
            .addCase(AddProjectThunk.rejected, (state: CombineProjectState, action: AnyAction) => {
                state.isSuccess = false;
                    state.addProjectDataError = action?.error?.message
            })
    },
})

export default addProjectSlice.reducer;
export const defaultstate= addProjectSlice.actions.defaultState;