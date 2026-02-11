import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import countersReducer from "../features/counters/countersSlice"
import userReducer from "../features/user/userSlice"


// 1. Combine your reducers
const rootReducer = combineReducers({
    counters: countersReducer,
    user: userReducer
});

// 2. Set up persistence config
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['counters', 'user'],
};

// 3. Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // 4. Ignore Redux Persist actions to prevent console warnings
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),

        devTools: import.meta.env.MODE !== 'production',
})


// 5. Create and export the persistor
export const persistor = persistStore(store);

export default store