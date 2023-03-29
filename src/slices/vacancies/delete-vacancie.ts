import { BaseResponse, ErrorResponse, IModel } from '@models/common';
import { createAsyncThunk, createSlice, AnyAction } from '@reduxjs/toolkit';
import { deleteVacancie } from '@services/vacancie';
import axios from 'axios';

import { VacancieThunk } from './vacancie';

type CombineVacancieState = IModel & BaseResponse<[], 'currentVacancieData'> & ErrorResponse<null, 'currentVacancieError'>;
const initialState: CombineVacancieState = {
    isLoading: false,
    isSuccess: false,
    currentVacancieData: [],
    currentVacancieError: null
}

export const deleteVacancieThunk = createAsyncThunk(
    "deleteVacancie/deleteVacancieThunk",
    async (id: undefined | number, { fulfillWithValue, rejectWithValue, dispatch }) => {
        try {
            const response = await deleteVacancie(id);
            dispatch(VacancieThunk())
            return fulfillWithValue(response)
        } catch (error: unknown) {
            if (axios.isAxiosError(error))
                return Promise.reject(error?.response?.data?.error?.message[0])
        }
    }
)

const deleteVacancieSlice = createSlice({
    name: "deleteVacancie",
    initialState,
    reducers: {
        deleteVacancie(state: CombineVacancieState) {
            state.isLoading = false
            state.isSuccess = false
            state.currentVacancieError = null
        }
    },
    extraReducers(builder) {
        builder
            .addCase(deleteVacancieThunk.pending, (state: CombineVacancieState) => {
                state.isLoading = true
            })
            .addCase(deleteVacancieThunk.fulfilled, (state: CombineVacancieState, action: AnyAction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentVacancieData = action.payload
            })
            .addCase(deleteVacancieThunk.rejected, (state: CombineVacancieState, action: AnyAction) => {
                state.isSuccess = false;
                state.currentVacancieError = action?.error?.message
            })
    },
})

export default deleteVacancieSlice.reducer;
