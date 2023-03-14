import { EditCurrentTrainingApi } from '../../basic-api/index';
import { createAsyncThunk, createSlice, AnyAction } from '@reduxjs/toolkit';
import { IDataReducer } from 'src/interface/triningInterface';
import { IEditData } from 'src/interface/commonInterace';
 

const initialState: IDataReducer = {
    isLoading: false,
    isSuccess: false,
    trainingData: {
        data: []
    },
    trainingError: null
}

export const axiosEditCurrentTraining = createAsyncThunk(
    "editCurrentTraining/axiosEditCurrentTraining",
    async ({id,data}:IEditData) => {
        try {
            const response = await EditCurrentTrainingApi(id,data);
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
        defaultState(state) {
            state.isLoading=false;
            state.isSuccess=false;
            state.trainingError= null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(axiosEditCurrentTraining.pending, (state: IDataReducer) => {
                state.isLoading = true
            })
            .addCase(axiosEditCurrentTraining.fulfilled, (state: IDataReducer, action: AnyAction) => {
                state.isLoading = false;
                    state.isSuccess = true;
                    state.trainingData.data = action.payload
            })
            .addCase(axiosEditCurrentTraining.rejected, (state: IDataReducer, action: AnyAction) => {
                state.isSuccess = false;
                    state.trainingError = action?.error?.message
            })
    },

})

export default editCurrentTrainingSlice.reducer;
export const defaultState = editCurrentTrainingSlice.actions.defaultState;