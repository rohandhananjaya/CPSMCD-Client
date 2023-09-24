import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import cropReducer from '../features/crops/cropSlice';
import userReducer from '../features/users/usersSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        crops: cropReducer,
        users: userReducer,
    },
});