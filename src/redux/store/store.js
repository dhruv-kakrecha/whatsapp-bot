// redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contactReducer from "../contacts/contactSlice"

const persistContactConfig = {
    key: 'contacts',
    storage,
};

const persistedContactReducer = persistReducer(persistContactConfig, contactReducer);

const store = configureStore({
    reducer: {
        contacts: persistedContactReducer,
    },
});

const persistor = persistStore(store);

export { store, persistor };