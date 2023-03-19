import { CurrentVacancieApi } from '../../base-URL/vacancie/index';
import { createAsyncThunk, createSlice, AnyAction } from '@reduxjs/toolkit';
import { BaseResponse, ErrorResponse, IModel } from '../../models/common';

type combineVacancieState = IModel & BaseResponse<[], 'currentVacancieData'> & ErrorResponse<null, 'currentVacancieError'>;
const initialState: combineVacancieState = {
    isLoading: false,
    isSuccess: false,
    currentVacancieData: [],
    currentVacancieError: null
}

export const CurrentVacancieThunk = createAsyncThunk(
    "currentVacancie/CurrentVacancieThunk",
    async (id: string | undefined) => {
        try {
            const response = await CurrentVacancieApi(id);
            return Promise.resolve(response.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
)

const CurrentVacancieSlice = createSlice({
    name: "currentVacancie",
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
            .addCase(CurrentVacancieThunk.pending, (state: combineVacancieState) => {
                state.isLoading = true;
            })
            .addCase(CurrentVacancieThunk.fulfilled, (state:combineVacancieState, action: AnyAction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentVacancieData = action.payload
            })
            .addCase(CurrentVacancieThunk.rejected, (state:combineVacancieState, action: AnyAction) => {
                state.isSuccess = false;
                state.currentVacancieError = action?.error?.message
            })
    },
})

export default CurrentVacancieSlice.reducer;
export const defaultState = CurrentVacancieSlice.actions.defaultState;