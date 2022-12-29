import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the contacts slice
const initialState = {
  contacts: [],
  loading: false,
  error: null,
};

// Create the contacts slice using the createSlice function from the redux-toolkit library
const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    // Reducer for setting the contacts list
    setContacts(state, action) {
      state.contacts = action.payload;
      state.loading = false;
      state.error = null;
    },
    // Reducer for adding a contact to the list
    addContact(state, action) {
      state.contacts.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    // Reducer for updating a contact in the list
    updateContact(state, action) {
      const index = state.contacts.findIndex((c) => c.id === action.payload.id);
      state.contacts[index] = action.payload;
      state.loading = false;
      state.error = null;
    },
    // Reducer for deleting a contact from the list
    deleteContact(state, action) {
      state.contacts = state.contacts.filter((c) => c.id !== action.payload.id);
      state.loading = false;
      state.error = null;
    },
    // Reducer for setting the loading flag when making an API call
    setLoading(state) {
      state.loading = true;
    },
    // Reducer for setting the error flag if an error occurs during an API call
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Extract the actions and reducers from the slice
const { actions, reducer } = contactsSlice;

// Export the actions and reducer
export const {
  setContacts,
  addContact,
  updateContact,
  deleteContact,
  setLoading,
  setError,
} = actions;
export default reducer;
