import { IState } from '../../interface/commonInterace/interface';
import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllTrainingRequest } from '../../basic-api/index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IDataReducer } from '../../interface/triningInterface/trainingInterface';
import { Iaction } from '../../interface/commonInterace/interface';

const initialState: IDataReducer = {
    isLoading: false,
    isSuccess: false,
    trainingData: {
        data: []
    },
    trainingError: null
}

export const axiosTraining = createAsyncThunk(
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
    extraReducers(builder) {
        builder
            .addCase(axiosTraining.pending, (state: IDataReducer) => {
                state.isLoading = true
            })
            .addCase(axiosTraining.fulfilled, (state: IDataReducer, action: Iaction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.trainingData.data = action.payload
            })
            .addCase(axiosTraining.rejected, (state: IDataReducer, action: AnyAction) => {
                state.isSuccess = false;
                state.trainingError = action?.error?.message
            })
    },
})

export default trainingSlice.reducer