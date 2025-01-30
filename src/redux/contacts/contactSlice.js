import { createSlice } from '@reduxjs/toolkit';

export const contactSlice = createSlice({
    name: 'contacts',
    initialState: {
        contacts: []
    },
    reducers: {
        addContacts: (state, action) => {
            state.contacts = [...state.contacts, ...action.payload];
        },
        editContact: (state, action) => {
            const { index, data } = action.payload
            state.contacts[index] = { ...state.contacts[index], ...data };
        },
        deleteContact: (state, action) => {
            const { index } = action.payload
            state.contacts.splice(index, 1);
        }
    }
});

export const { addContacts, editContact, deleteContact } = contactSlice.actions;

export default contactSlice.reducer;