import { VacancieApi } from '../../base-URL/index';
import { ErrorResponse, IModel } from '../../models/common/common';
import { AnyAction, createSlice } from '@reduxjs/toolkit';


import { createAsyncThunk } from '@reduxjs/toolkit';
import { BaseResponse } from '../../models/common/common';

type combineVacancieState = IModel & BaseResponse<[], 'vacancieData'> & ErrorResponse<null, 'vacancieError'>;

const initialState:combineVacancieState = {
    isLoading: false,
    isSuccess: false,
    vacancieData: [],
    vacancieError: null
}

export const VacancieThunk = createAsyncThunk(
    "vacncie/VacancieThunk",
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
            .addCase(VacancieThunk.pending, (state: combineVacancieState) => {
                state.isLoading = true;
            })
            .addCase(VacancieThunk.fulfilled, (state: combineVacancieState, action:AnyAction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.vacancieData = action.payload
            })
            .addCase(VacancieThunk.rejected, (state: combineVacancieState, action:AnyAction) => {
                state.isSuccess = false;
                state.vacancieError = action.error
            })
    },
})

export default vacancieslice.reducer;
