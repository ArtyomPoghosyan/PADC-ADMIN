import { createSlice, AnyAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { EditVacancie } from '@services/vacancie';

import { BaseResponse, ErrorResponse, IEditData, IModel } from '../../models/common';

type CombineVacancieState = IModel & BaseResponse<[], 'editVacancieData'> & ErrorResponse<null, 'editVacancieError'>;

const initialState: CombineVacancieState = {
    isLoading: false,
    isSuccess: false,
    editVacancieData: [],
    editVacancieError: null
}

export const EditCurrentVacancieThunk = createAsyncThunk(
    "ediTCurrentVacancie/ CurrentVacancieThunk",
    async ({ id, data }: IEditData) => {
        console.log(data)
        try {
            const response = await EditVacancie(id, data);
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
            .addCase(EditCurrentVacancieThunk.pending, (state: CombineVacancieState) => {
                state.isLoading = true
            })
            .addCase(EditCurrentVacancieThunk.fulfilled, (state: CombineVacancieState, action: AnyAction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.editVacancieData = action.payload
            })
            .addCase(EditCurrentVacancieThunk.rejected, (state: CombineVacancieState, action: AnyAction) => {
                state.isSuccess = false;
                state.editVacancieError = action?.error?.message
            })
    },
})

export default editcurrentVacancieSlice.reducer;
export const vacancieState = editcurrentVacancieSlice.actions.vacancieState