import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./usersService";

const initialState = {
    users: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

// Get all users
export const getUsers = createAsyncThunk(
    "user/getUsers",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await userService.getUsers(token);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get user by id
export const getUserById = createAsyncThunk(
    "user/getUserById",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await userService.getUserById(id, token);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Update user
export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (bindData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const id = bindData.id;
            const data = bindData.data;
            console.log(data);
            return await userService.updateUser(id, data, token);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        reset: (state) =>  initialState,
    },
    extraReducers:(builder)=> {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users = (action.payload)
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

    },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;