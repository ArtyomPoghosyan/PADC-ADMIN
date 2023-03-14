import { CurrentTrainingApi } from '../../basic-api/index';
import { createAsyncThunk, createSlice, AnyAction } from '@reduxjs/toolkit';
import { Iaction } from 'src/interface/commonInterace/interface';
import { IDataReducer } from 'src/interface/triningInterface/trainingInterface';

const initialState:IDataReducer = { 
    isLoading: false,
    isSuccess: false,
    trainingData: {
        data: []
    },
    trainingError: null
}

export const axiosCurrentTraining = createAsyncThunk(
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
        .addCase(axiosCurrentTraining.pending,(state:IDataReducer) => {
            state.isLoading= true
        })
        .addCase(axiosCurrentTraining.fulfilled,(state:IDataReducer,action:AnyAction)=> {
            console.log(action,"success");
            state.isLoading=false;
            state.isSuccess=true;
            state.trainingData.data= action.payload
        })
        .addCase(axiosCurrentTraining.rejected,(state:IDataReducer,action:AnyAction) => {
            console.log(action,"errror");
            state.isSuccess=false;
            state.trainingError=action?.error?.message
        })
    },
})

export default currentTrianingSlice.reducer;
export const defaultState = currentTrianingSlice.actions.defaultState