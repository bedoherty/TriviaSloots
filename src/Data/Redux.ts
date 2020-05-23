import storage from "redux-persist/lib/storage";
import { persistCombineReducers, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "src/Data/Reducers/User";

const persistConfig = {
    key: 'root',
    storage,
}

const reducerMap = {
    User: userReducer
};

export const store = configureStore({ 
    reducer: persistCombineReducers(persistConfig, reducerMap),
    devTools: true
});

export const persistor = persistStore(store);