import { HTTPHelper } from '@helpers/http.helper';
import { IAddTraining } from '@models/trainings';
import { AnyAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addTraining } from '@services/training';
import axios from 'axios';

import { BaseResponse, ErrorResponse, IModel } from '../../models/common';

type CombineTrainingState = IModel & BaseResponse<[], 'addTrainingData'> & ErrorResponse<null, 'addTrainingError'>;

const initialState: CombineTrainingState = {
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
            const response = await addTraining(formData);
            return Promise.resolve(response.data)
        } catch (error: unknown) {
            if (axios.isAxiosError(error))
                return Promise.reject(error?.response?.data?.error?.message[0])
        }
    }
)

const addTrainingSlice = createSlice({
    name: "addTraining",
    initialState,
    reducers: {
        defaultState(state) {
            state.isLoading = false;
            state.isSuccess = false;
            state.addTrainingError = null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(AddTrainingThunk.pending, (state: CombineTrainingState) => {
                state.isLoading = true
            })
            .addCase(AddTrainingThunk.fulfilled, (state: CombineTrainingState, action: AnyAction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.addTrainingData = action.payload
            })
            .addCase(AddTrainingThunk.rejected, (state: CombineTrainingState, action: AnyAction) => {
                state.isSuccess = false;
                state.addTrainingError = action?.error?.message
            })
    },
})

export default addTrainingSlice.reducer
export const defaultState = addTrainingSlice.actions.defaultState