import { Iaction } from '@models/common';
import { ITrainingData } from '@models/trainings';
import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllTrainingRequest } from '@services/training';
import axios from 'axios';

const initialState: ITrainingData = {
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
        } catch (error: unknown) {
            if (axios.isAxiosError(error))
                return Promise.reject(error?.response?.data?.error?.message[0])
        }
    }
)

const trainingSlice = createSlice({
    name: "training",
    initialState,
    reducers: {},
    extraReducers(builder: any) {
        builder
            .addCase(TrainingThunk.pending, (state: ITrainingData) => {
                state.isLoading = true
            })
            .addCase(TrainingThunk.fulfilled, (state: ITrainingData, action: Iaction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.trainingData.data = action.payload
            })
            .addCase(TrainingThunk.rejected, (state: ITrainingData, action: AnyAction) => {
                state.isSuccess = false;
                state.trainingError = action?.error?.message
            })
    },
})

export default trainingSlice.reducer