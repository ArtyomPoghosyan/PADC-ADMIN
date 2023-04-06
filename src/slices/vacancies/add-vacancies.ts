import { createAsyncThunk, createSlice, AnyAction } from '@reduxjs/toolkit';

import { BaseResponse, ErrorResponse, IModel } from '@models/common';
import { IAddVacancieData } from '@models/vacancies';

import { AddVacancie } from '@services/vacancie';

import axios from 'axios';

type CombineVacancieState = IModel & BaseResponse<[], 'currentVacancieData'> & ErrorResponse<null, 'currentVacancieError'>;

const initialState: CombineVacancieState = {
    isLoading: false,
    isSuccess: false,
    currentVacancieData: [],
    currentVacancieError: null
}

export const AddVacancieThunk = createAsyncThunk(
    "addVacancie/VacancieThunk",
    async (data: IAddVacancieData) => {
        try {
            const response = await AddVacancie(data);
            return Promise.resolve(response.data)
        } catch (error: unknown) {
            if (axios.isAxiosError(error))
                return Promise.reject(error?.response?.data?.error?.message[0])
        }
    }
)

const addVacancieSlice = createSlice({
    name: "AddVacancieThunk",
    initialState,
    reducers: {
        addVacancieResetState(state) {
            state.isLoading = false;
            state.isSuccess = false;
            state.currentVacancieError = null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(
                AddVacancieThunk.pending, (state: CombineVacancieState) => {
                    state.isLoading = true
                })
            .addCase(AddVacancieThunk.fulfilled, (state: CombineVacancieState, action: AnyAction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentVacancieData = action.payload
            })
            .addCase(AddVacancieThunk.rejected, (state: CombineVacancieState, action: AnyAction) => {
                state.isSuccess = false;
                state.currentVacancieError = action?.error?.message
            })
    },
})

export default addVacancieSlice.reducer;
export const addVacancieResetState = addVacancieSlice.actions.addVacancieResetState