import { createAsyncThunk, createSlice, AnyAction } from '@reduxjs/toolkit';

import { BaseResponse, ErrorResponse, IModel } from "@models/common";

import { currentcontact } from '@services/contact-request';

import axios from 'axios';

export type CombineContactState = IModel & BaseResponse<[], 'contactData'> & ErrorResponse<null, 'contactError'>;

const initialState: CombineContactState = {
    isLoading: false,
    isSuccess: false,
    contactData: [],
    contactError: null
}

export const currentContactThunk = createAsyncThunk(
    "currentContact/currentContactThunk",
    async (id: undefined | string) => {
        try {
            const response = await currentcontact(id);
            return Promise.resolve(response.data)
        } catch (error: unknown) {
            if (axios.isAxiosError(error))
                return Promise.reject(error?.response?.data?.error?.message[0])
        }
    }
)

const currentContactSlice = createSlice({
    name: "currentContact",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(currentContactThunk.pending, (state: CombineContactState) => {
                state.isLoading = true
            })
            .addCase(currentContactThunk.fulfilled, (state: CombineContactState, action: AnyAction) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.contactData = action.payload
            })
            .addCase(currentContactThunk.rejected, (state: CombineContactState, action: AnyAction) => {
                state.isSuccess = false;
                state.contactError = action?.error?.message

            })
    },
})

export default currentContactSlice.reducer;