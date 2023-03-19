import { HTTPHelper } from '../../helpers/http.helper';
import { addTrainingApi } from '../../base-URL/training/Training';
import { AnyAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BaseResponse, ErrorResponse, IModel } from '../../models/common';
import { IAddTraining } from '../../models/trainings';

type combineVacancieState = IModel & BaseResponse<[], 'addTrainingData'> & ErrorResponse<null, 'addTrainingError'>;

const initialState: combineVacancieState = {
    isLoading: false,
    isSuccess: false,
    addTrainingData: [],
    addTrainingError: null
}

export const AddTrainingThunk = createAsyncThunk(
    "addTraingin/AddTrainingThunk",
    async (data: IAddTraining) => {
        try {
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
            .addCase(AddTrainingThunk.pending, (state: combineVacancieState) => {
                state.isLoading = true
            })
            .addCase(AddTrainingThunk.fulfilled, (state: combineVacancieState, action: AnyAction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.addTrainingData = action.payload
            })
            .addCase(AddTrainingThunk.rejected, (state: combineVacancieState, action: AnyAction) => {
                state.isSuccess = false;
                state.addTrainingError = action?.error?.message
            })
    },
})

export default addTrainingSlice.reducer
export const defaultState = addTrainingSlice.actions.defaultState