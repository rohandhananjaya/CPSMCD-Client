import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    crops: [],
    isErrors: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const cropSlice = createSlice({
    name: 'crop',
    initialState,
    reducers:{
        reset: (state) => initialState
    }
})

export const { reset } = cropSlice.actions
export default cropSlice.reducer