import { createSlice, AnyAction } from '@reduxjs/toolkit';
import { EditVacancieApi } from '../../basic-api/vacancieApi/index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BaseResponse, ErrorResponse, IEditData, IModel } from "src/interface/commonInterace";

type combineVacancieState = IModel & BaseResponse<[], 'editVacancieData'> & ErrorResponse<null, 'editVacancieError'>;

const initialState:combineVacancieState ={
    isLoading:false,
    isSuccess:false,
    editVacancieData:[],
    editVacancieError:null
}

export const axiosEditCurrentVacancie = createAsyncThunk(
    "ediTCurrentVacancie/ axiosCurrentVacancie",
    async ({id,data}:IEditData) => {
        try {
            const response = await EditVacancieApi(id,data);
            return Promise.resolve(response.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
)

const editcurrentVacancieSlice = createSlice({
    name:"editCurrentVacnacie",
    initialState,
    reducers: {
        defaultState(state) {
            state.isLoading=false;
            state.isSuccess=false;
            state.editVacancieError= null; 
        }
},
    extraReducers(builder) {
        builder
        .addCase(axiosEditCurrentVacancie.pending,(state:combineVacancieState) => {
            state.isLoading=true
        })
        .addCase(axiosEditCurrentVacancie.fulfilled,(state:combineVacancieState,action:AnyAction)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.editVacancieData=action.payload
        })
        .addCase(axiosEditCurrentVacancie.rejected,(state:combineVacancieState,action:AnyAction)=>{
            state.isSuccess=false;
            state.editVacancieError=action?.error?.message
        })
    },
})

export default editcurrentVacancieSlice.reducer;
export const defaultState = editcurrentVacancieSlice.actions.defaultState