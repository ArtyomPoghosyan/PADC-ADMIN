import { CurrentTrainingApi } from '../../services';

import { createAsyncThunk, createSlice, AnyAction } from '@reduxjs/toolkit';
import { ITrainingData } from '../../models/trainings';

const initialState:ITrainingData = { 
    isLoading: false,
    isSuccess: false,
    trainingData: {
        data: []
    },
    trainingError: null
}

export const CurrentTrainingThunk = createAsyncThunk(
    "curentTraining/axiosCurentTrining",
    async (id:undefined | string)  => {
        try {
            const response = await CurrentTrainingApi(id)
            return Promise.resolve(response.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
)

const currentTrianingSlice =createSlice({
    name:"currentTraining",
    initialState,
    reducers: {
        defaultState(state) {
            state.isLoading=false;
            state.isSuccess=false;
            state.trainingError= null;
        }
    },
    extraReducers(builder) {
        builder
        .addCase(CurrentTrainingThunk.pending,(state:ITrainingData) => {
            state.isLoading= true
        })
        .addCase(CurrentTrainingThunk.fulfilled,(state:ITrainingData,action:AnyAction)=> {
            state.isLoading=false;
            state.isSuccess=true;
            state.trainingData.data= action.payload
        })
        .addCase(CurrentTrainingThunk.rejected,(state:ITrainingData,action:AnyAction) => {
            state.isSuccess=false;
            state.trainingError=action?.error?.message
        })
    },
})

export default currentTrianingSlice.reducer;
export const trainingState = currentTrianingSlice.actions.defaultState