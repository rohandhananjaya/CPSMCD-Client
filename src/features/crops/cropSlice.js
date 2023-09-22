import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cropService from "./cropService";

const initialState = {
    crops: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

// Create new crop
export const createCrop = createAsyncThunk(
    "crop/createCrop",
    async (cropData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await cropService.createCrop(cropData, token)
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get all crops
export const getCrops = createAsyncThunk(
    "crop/getCrops",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await cropService.getCrops(token)
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Update crop
export const updateCrop = createAsyncThunk(
    "crop/updateCrop",
    async (bindData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const id = bindData.id;
            const cropData = bindData.cropData;
            return await cropService.updateCrop(id, cropData, token)
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const cropSlice = createSlice({
    name: "crop",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCrop.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createCrop.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.crops.push(action.payload)
            })
            .addCase(createCrop.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(getCrops.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCrops.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.crops = action.payload
            })
            .addCase(getCrops.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(updateCrop.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateCrop.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.crops = action.payload
            })
            .addCase(updateCrop.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = cropSlice.actions
export default cropSlice.reducer