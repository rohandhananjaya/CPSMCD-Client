import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
    crops: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

const cropSlice = createSlice({
    name: "crop",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
})

export const {reset} = cropSlice.actions
export default cropSlice.reducer