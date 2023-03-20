import { EditCurrentTraining } from '../../services';

import { createAsyncThunk, createSlice, AnyAction } from '@reduxjs/toolkit';

import { ITrainingData } from '../../models/trainings';
import { IEditData } from '../../models/common';
 
const initialState: ITrainingData = {
    isLoading: false,
    isSuccess: false,
    trainingData: {
        data: []
    },
    trainingError: null
}

export const EditCurrentTrainingThunk = createAsyncThunk(
    "editCurrentTraining/EditCurrentTrainingThunk",
    async ({id,data}:IEditData) => {
        try {
            const response = await EditCurrentTraining(id,data);
            return Promise.resolve(response.data);
        } catch (error) {
            return Promise.reject(error)
        }
    }
)

const editCurrentTrainingSlice = createSlice({
    name: "editCurrentTraining",
    initialState,
    reducers: {
        trainingState(state) {
            state.isLoading=false;
            state.isSuccess=false;
            state.trainingError= null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(EditCurrentTrainingThunk.pending, (state: ITrainingData) => {
                state.isLoading = true
            })
            .addCase(EditCurrentTrainingThunk.fulfilled, (state: ITrainingData, action: AnyAction) => {
                state.isLoading = false;
                    state.isSuccess = true;
                    state.trainingData.data = action.payload
            })
            .addCase(EditCurrentTrainingThunk.rejected, (state: ITrainingData, action: AnyAction) => {
                state.isSuccess = false;
                    state.trainingError = action?.error?.message
            })
    },

})

export default editCurrentTrainingSlice.reducer;
export const trainingState = editCurrentTrainingSlice.actions.trainingState;