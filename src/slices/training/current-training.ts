// import { CurrentTraining } from '../../services';

import { ITrainingData } from '@models/trainings';
import { createAsyncThunk, createSlice, AnyAction } from '@reduxjs/toolkit';
import { CurrentTraining } from '@services/training';
import axios from 'axios';
// import { ITrainingData } from '../../models/trainings';

const initialState: ITrainingData = {
    isLoading: false,
    isSuccess: false,
    trainingData: {
        data: []
    },
    trainingError: null
}

export const CurrentTrainingThunk = createAsyncThunk(
    "curentTraining/axiosCurentTrining",
    async (id: undefined | string) => {
        try {
            const response = await CurrentTraining(id)
            return Promise.resolve(response.data)
        } catch (error: unknown) {
            if (axios.isAxiosError(error))
                return Promise.reject(error?.response?.data?.error?.message[0])
        }
    }
)

const currentTrianingSlice = createSlice({
    name: "currentTraining",
    initialState,
    reducers: {
        defaultState(state) {
            state.isLoading = false;
            state.isSuccess = false;
            state.trainingError = null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(CurrentTrainingThunk.pending, (state: ITrainingData) => {
                state.isLoading = true
            })
            .addCase(CurrentTrainingThunk.fulfilled, (state: ITrainingData, action: AnyAction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.trainingData.data = action.payload
            })
            .addCase(CurrentTrainingThunk.rejected, (state: ITrainingData, action: AnyAction) => {
                state.isSuccess = false;
                state.trainingError = action?.error?.message
            })
    },
})

export default currentTrianingSlice.reducer;
export const trainingState = currentTrianingSlice.actions.defaultState