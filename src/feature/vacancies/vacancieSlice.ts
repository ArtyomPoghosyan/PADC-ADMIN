import { VacancieApi } from './../../basic-api/index';
import { ErrorResponse, IModel } from '../../interface/commonInterace/interface';
import { AnyAction, createSlice } from '@reduxjs/toolkit';
// import { VacancieApi } from '@api/vacancieApi/vacancieApi';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { BaseResponse } from '../../interface/commonInterace/interface';

type combineVacancieState = IModel & BaseResponse<[], 'vacancieData'> & ErrorResponse<null, 'vacancieError'>;

const initialState:combineVacancieState = {
    isLoading: false,
    isSuccess: false,
    vacancieData: [],
    vacancieError: null
}

export const axiosVacancie = createAsyncThunk(
    "vacncie/axiosVacancie",
    async () => {
        try {
            const response = await VacancieApi();
            return Promise.resolve(response.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
)

const vacancieslice = createSlice({
    name: "vacancie",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(axiosVacancie.pending, (state: combineVacancieState) => {
                state.isLoading = true;
            })
            .addCase(axiosVacancie.fulfilled, (state: combineVacancieState, action:AnyAction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.vacancieData = action.payload
            })
            .addCase(axiosVacancie.rejected, (state: combineVacancieState, action:AnyAction) => {
                state.isSuccess = false;
                state.vacancieError = action.error
            })
    },
})

export default vacancieslice.reducer;
