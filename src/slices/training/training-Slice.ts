import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllTrainingRequest } from '../../base-URL/training/index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IDataReducer } from '../../models/trainings/trainings';
import { Iaction } from '../../models/common/common';

const initialState: IDataReducer = {
    isLoading: false,
    isSuccess: false,
    trainingData: {
        data: []
    },
    trainingError: null
}

export const TrainingThunk = createAsyncThunk(
    "training/axiosTraingin",
    async () => {
        try {
            const response = await getAllTrainingRequest();
            return Promise.resolve(response.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
)

const trainingSlice = createSlice({
    name: "training",
    initialState,
    reducers: {},
    extraReducers(builder:any) {
        builder
            .addCase(TrainingThunk.pending, (state: IDataReducer) => {
                state.isLoading = true
            })
            .addCase(TrainingThunk.fulfilled, (state: IDataReducer, action: Iaction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.trainingData.data = action.payload
            })
            .addCase(TrainingThunk.rejected, (state: IDataReducer, action: AnyAction) => {
                state.isSuccess = false;
                state.trainingError = action?.error?.message
            })
    },
})

export default trainingSlice.reducer