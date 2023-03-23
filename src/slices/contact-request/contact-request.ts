import { createAsyncThunk, createSlice, AnyAction } from '@reduxjs/toolkit';
import { BaseResponse, ErrorResponse, IModel } from "@models/common";
import { contactRequest } from '@services/contact-request';

export type CombineContactState = IModel & BaseResponse<[], 'contactData'> & ErrorResponse<null, 'contactError'>;

const initialState: CombineContactState = {
    isLoading: false,
    isSuccess: false,
    contactData: [],
    contactError: null
}

export const contactRequestThunk = createAsyncThunk(
    "contactRequest/contactRequestThunk",
    async () => {
        try {
            const response = await contactRequest()
            return Promise.resolve(response.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
)

const contactRequestSlice = createSlice({
    name:"contactRequest",
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
        .addCase(contactRequestThunk.pending,(state:CombineContactState) => {
            state.isLoading= true
        })
        .addCase(contactRequestThunk.fulfilled,(state:CombineContactState,action:AnyAction) => {
            state.isLoading= false;
            state.isSuccess= true;
            state.contactData= action.payload
        })
        .addCase(contactRequestThunk.rejected,(state:CombineContactState,action:AnyAction) => {
            state.isSuccess=false;
            state.contactError=action?.error?.message
        })
    },
})

export default contactRequestSlice.reducer;