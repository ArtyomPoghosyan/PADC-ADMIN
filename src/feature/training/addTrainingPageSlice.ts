import { HTTPHelper } from './../../helpers/http.helper';
import { addTrainingApi } from './../../basic-api/trainingApi/currentTrainingApi';
import { AnyAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BaseResponse, ErrorResponse, IModel } from "src/interface/commonInterace"
import { IAddTraining, IDataReducer } from 'src/interface/triningInterface';

type combineVacancieState = IModel & BaseResponse<[], 'addTrainingData'> & ErrorResponse<null, 'addTrainingError'>;

const initialState: combineVacancieState = {
    isLoading: false,
    isSuccess: false,
    addTrainingData: [],
    addTrainingError: null
}

export const axiosAddTraining = createAsyncThunk(
    "addTraingin/axiosAddTraining",
    async (data: IAddTraining) => {
        try {
            console.log('data', data);
            const formData = HTTPHelper.generateFormData(data);
            const response = await addTrainingApi(formData);
            return Promise.resolve(response.data)

        } catch (error) {
            return Promise.reject(error)
        }
    }
)

const addTrainingSlice = createSlice({
    name: "addTraining",
    initialState,
    reducers: {
        defaultState(state) {
            state.isLoading=false;
            state.isSuccess=false;
            state.addTrainingError= null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(axiosAddTraining.pending, (state: combineVacancieState) => {
                state.isLoading = true
            })
            .addCase(axiosAddTraining.fulfilled, (state: combineVacancieState, action: AnyAction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.addTrainingData = action.payload
            })
            .addCase(axiosAddTraining.rejected, (state: combineVacancieState, action: AnyAction) => {
                state.isSuccess = false;
                state.addTrainingError = action?.error?.message
            })
    },
})

export default addTrainingSlice.reducer
export const defaultState = addTrainingSlice.actions.defaultState