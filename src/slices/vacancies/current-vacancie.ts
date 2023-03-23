import { BaseResponse, ErrorResponse, IModel } from '@models/common';
import { createAsyncThunk, createSlice, AnyAction } from '@reduxjs/toolkit';
import { CurrentVacancie } from '@services/vacancie';

type CombineVacancieState = IModel & BaseResponse<[], 'currentVacancieData'> & ErrorResponse<null, 'currentVacancieError'>;

const initialState: CombineVacancieState = {
    isLoading: false,
    isSuccess: false,
    currentVacancieData: [],
    currentVacancieError: null
}

export const CurrentVacancieThunk = createAsyncThunk(
    "currentVacancie/CurrentVacancieThunk",
    async (id: undefined | string ) => {
        try {
            const response = await CurrentVacancie(id);
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
            state.isLoading = false;
            state.isSuccess = false;
            state.currentVacancieError = null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(CurrentVacancieThunk.pending, (state: CombineVacancieState) => {
                state.isLoading = true;
            })
            .addCase(CurrentVacancieThunk.fulfilled, (state: CombineVacancieState, action: AnyAction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentVacancieData = action.payload
            })
            .addCase(CurrentVacancieThunk.rejected, (state: CombineVacancieState, action: AnyAction) => {
                state.isSuccess = false;
                state.currentVacancieError = action?.error?.message
            })
    },
})

export default CurrentVacancieSlice.reducer;
export const defaultState = CurrentVacancieSlice.actions.defaultState;