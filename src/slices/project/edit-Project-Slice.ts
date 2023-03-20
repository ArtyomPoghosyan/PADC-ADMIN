import { editCurentProjectAPi } from '../../base-URL/project/index';
import { createAsyncThunk, createSlice, AnyAction } from '@reduxjs/toolkit';
import { BaseResponse, ErrorResponse, IModel } from '../../models/common';

type combineProjectState = IModel & BaseResponse<[], 'currentProjectData'> & ErrorResponse<null, 'currentProjectError'>;

const initialState: combineProjectState = {
    isLoading: false,
    isSuccess: false,
    currentProjectData: [],
    currentProjectError: null
}

export const EditCurrentProjectThunk = createAsyncThunk(
    "editcurrentProject/axiosEditCurrentProject",
    async ({ id, data }: any) => {
        try {
            const response = await editCurentProjectAPi(id, data);
            return Promise.resolve(response.data)
        } catch (error) {
            return Promise.reject(error)
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
        .addCase(EditCurrentProjectThunk.pending,(state)=>{
            state.isLoading= true;
        })
        .addCase(EditCurrentProjectThunk.fulfilled,(state:combineProjectState,action:AnyAction) => {
            state.isLoading= false;
            state.isSuccess= true;
            state.currentProjectData = action.payload
        })
        .addCase(EditCurrentProjectThunk.rejected,(state:combineProjectState,action:AnyAction) => {
            state.isSuccess= false;
            state.currentProjectError= action?.error?.message;
        })
    },
})

export default editCurrentProjectSlice.reducer;
export const ProjectState = editCurrentProjectSlice.actions.ProjectState;

