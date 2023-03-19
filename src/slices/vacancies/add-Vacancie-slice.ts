import { AddVacancieApi } from '../../base-URL/vacancie/index';
import { createAsyncThunk, createSlice, AnyAction } from '@reduxjs/toolkit';
import { BaseResponse, ErrorResponse, IModel } from '../../models/common';
import { IAddVacancieData } from '../../models/vacancies';


type combineVacancieState = IModel & BaseResponse<[], 'currentVacancieData'> & ErrorResponse<null, 'currentVacancieError'>;

const initialState: combineVacancieState = {
    isLoading: false,
    isSuccess: false,
    currentVacancieData: [],
    currentVacancieError: null
}

export const AddVacancieThunk = createAsyncThunk(
    "addVacancie/VacancieThunk",
    async (data: IAddVacancieData) => {
        try {
            const response = await AddVacancieApi(data);
            return Promise.resolve(response.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
)

const addVacancieSlice = createSlice({
    name: "AddVacancieThunk",
    initialState,
    reducers: {
        defaultState(state) {
            state.isLoading=false;
            state.isSuccess=false;
            state.currentVacancieError= null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(
                AddVacancieThunk.pending, (state: combineVacancieState) => {
                    state.isLoading = true
                })
            .addCase(AddVacancieThunk.fulfilled, (state: combineVacancieState, action: AnyAction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentVacancieData = action.payload
            })
            .addCase(AddVacancieThunk.rejected, (state: combineVacancieState, action: AnyAction) => {
                state.isSuccess = false;
                state.currentVacancieError = action?.error?.message
            })
    },
})

export default addVacancieSlice.reducer;
export const defaultState = addVacancieSlice.actions.defaultState