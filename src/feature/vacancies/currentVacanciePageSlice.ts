import { CurrentVacancieApi } from '../../basic-api/vacancieApi/index';
import { createAsyncThunk, createSlice, AnyAction } from '@reduxjs/toolkit';
import { BaseResponse, ErrorResponse, IModel } from "src/interface/commonInterace";

type combineVacancieState = IModel & BaseResponse<[], 'currentVacancieData'> & ErrorResponse<null, 'currentVacancieError'>;
const initialState: combineVacancieState = {
    isLoading: false,
    isSuccess: false,
    currentVacancieData: [],
    currentVacancieError: null
}

export const axiosCurrentVacancie = createAsyncThunk(
    "currentVacancie/axiosCurrentVacancie",
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
            .addCase(axiosCurrentVacancie.pending, (state: combineVacancieState) => {
                state.isLoading = true;
            })
            .addCase(axiosCurrentVacancie.fulfilled, (state, action: AnyAction) => {
                console.log(state, "sucesssssssnoc")
                state.isLoading = false;
                state.isSuccess = true;
                state.currentVacancieData = action.payload
            })
            .addCase(axiosCurrentVacancie.rejected, (state, action: AnyAction) => {
                console.log(state, "errrrroro")
                state.isSuccess = false;
                state.currentVacancieError = action?.error?.message
            })
    },
})

export default CurrentVacancieSlice.reducer;
export const defaultState = CurrentVacancieSlice.actions.defaultState;