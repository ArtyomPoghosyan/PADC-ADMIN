import { AddVacancieApi } from '../../basic-api/vacancieApi/index';
import { createAsyncThunk, createSlice, AnyAction } from '@reduxjs/toolkit';
import { BaseResponse, ErrorResponse, IModel } from "src/interface/commonInterace";
import { IAddVacancieData } from 'src/interface/vacancieInterface';

type combineVacancieState = IModel & BaseResponse<[], 'currentVacancieData'> & ErrorResponse<null, 'currentVacancieError'>;

const initialState: combineVacancieState = {
    isLoading: false,
    isSuccess: false,
    currentVacancieData: [],
    currentVacancieError: null
}

export const axiosAddVacancie = createAsyncThunk(
    "addVacancie/axiosVacancie",
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
    name: "axiosAddVacancie",
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
                axiosAddVacancie.pending, (state: combineVacancieState) => {
                    state.isLoading = true
                })
            .addCase(axiosAddVacancie.fulfilled, (state: combineVacancieState, action: AnyAction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentVacancieData = action.payload
            })
            .addCase(axiosAddVacancie.rejected, (state: combineVacancieState, action: AnyAction) => {
                state.isSuccess = false;
                state.currentVacancieError = action?.error?.message
            })
    },
})

export default addVacancieSlice.reducer;
export const defaultState = addVacancieSlice.actions.defaultState