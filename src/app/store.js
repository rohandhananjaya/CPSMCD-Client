import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import cropReducer from '../features/crops/cropSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        crops: cropReducer,
    },
});