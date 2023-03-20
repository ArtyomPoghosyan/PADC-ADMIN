
import { ErrorResponse, IModel } from '../../models/common/common';
import { BaseResponse } from '../../models/common/common';

import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Vacancie } from '../../services';

type CombineVacancieState = IModel & BaseResponse<[], 'vacancieData'> & ErrorResponse<null, 'vacancieError'>;

const initialState:CombineVacancieState = {
    isLoading: false,
    isSuccess: false,
    vacancieData: [],
    vacancieError: null
}

export const VacancieThunk = createAsyncThunk(
    "vacncie/VacancieThunk",
    async () => {
        try {
            const response = await Vacancie();
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
            .addCase(VacancieThunk.pending, (state: CombineVacancieState) => {
                state.isLoading = true;
            })
            .addCase(VacancieThunk.fulfilled, (state: CombineVacancieState, action:AnyAction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.vacancieData = action.payload
            })
            .addCase(VacancieThunk.rejected, (state: CombineVacancieState, action:AnyAction) => {
                state.isSuccess = false;
                state.vacancieError = action.error
            })
    },
})

export default vacancieslice.reducer;
