import { createAsyncThunk, createSlice, AnyAction } from '@reduxjs/toolkit';
import {  deleteTraining } from '@services/training';
import { ITrainingData } from '@models/trainings';
import { TrainingThunk } from './training';

const initialState: ITrainingData = {
    isLoading: false,
    isSuccess: false,
    trainingData: {
        data: []
    },
    trainingError: null
}

export const deleteTrainingThunk = createAsyncThunk(
    "deleteTraining/deleteTrainingThunk",
    async (id: undefined | string, { fulfillWithValue, rejectWithValue, dispatch }) => {
        try {
            const response = await deleteTraining(id);
            dispatch(TrainingThunk())
            return fulfillWithValue(response.data)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const deleteTrainingSlice = createSlice({
    name: "deleteTraining",
    initialState,
    reducers: {
        deleteTraining(state: ITrainingData) {
            state.isLoading = false
            state.isSuccess = false
            state.trainingError = null
        }
    },
    extraReducers(builder) {
        builder
            .addCase(deleteTrainingThunk.pending, (state: ITrainingData) => {
                state.isLoading = true
            })
            .addCase(deleteTrainingThunk.fulfilled, (state: ITrainingData, action: AnyAction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.trainingData.data = action.payload
            })
            .addCase(deleteTrainingThunk.rejected,(state:ITrainingData,action:AnyAction) => {
                state.isSuccess= false;
                state.trainingError= action?.error?.message
            })
    },
})

export default deleteTrainingSlice.reducer;
export const deleteTrainingState = deleteTrainingSlice.actions.deleteTraining