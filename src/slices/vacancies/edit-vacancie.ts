
import { createSlice, AnyAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { BaseResponse, ErrorResponse, IEditData, IModel } from '../../models/common';

import { EditVacancieApi } from '../../services';

type combineVacancieState = IModel & BaseResponse<[], 'editVacancieData'> & ErrorResponse<null, 'editVacancieError'>;

const initialState: combineVacancieState = {
    isLoading: false,
    isSuccess: false,
    editVacancieData: [],
    editVacancieError: null
}

export const EditCurrentVacancieThunk = createAsyncThunk(
    "ediTCurrentVacancie/ CurrentVacancieThunk",
    async ({ id, data }: IEditData) => {
        try {
            const response = await EditVacancieApi(id, data);
            return Promise.resolve(response.data);
        } catch (error) {
            return Promise.reject(error)
        }
    }
)

const editcurrentVacancieSlice = createSlice({
    name: "editCurrentVacnacie",
    initialState,
    reducers: {
        vacancieState(state) {
            state.isLoading = false;
            state.isSuccess = false;
            state.editVacancieError = null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(EditCurrentVacancieThunk.pending, (state: combineVacancieState) => {
                state.isLoading = true
            })
            .addCase(EditCurrentVacancieThunk.fulfilled, (state: combineVacancieState, action: AnyAction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.editVacancieData = action.payload
            })
            .addCase(EditCurrentVacancieThunk.rejected, (state: combineVacancieState, action: AnyAction) => {
                state.isSuccess = false;
                state.editVacancieError = action?.error?.message
            })
    },
})

export default editcurrentVacancieSlice.reducer;
export const vacancieState = editcurrentVacancieSlice.actions.vacancieState