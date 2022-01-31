import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import counterReducer from './slices/counterSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        counter: counterReducer,
    }
});