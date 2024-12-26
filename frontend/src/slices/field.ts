import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Field {
    id: number;
    label: string;
    inputtype: string;
}
  

export interface FieldState {
    fields:Field[]
}

const initialState: FieldState = {
    fields: [
        { id: 1, label: "Title",inputtype:"text" },
    ]
};

const fieldSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {
    addingField(state, action: PayloadAction<Field>) {
      state.fields.push(action.payload);
    },

    clearFields(state) {
        state.fields=[]
    },

    updateField(state, action: PayloadAction<Field[]>) {
        state.fields=action.payload
    },

  },
});

// Export actions
export const { addingField, clearFields, updateField } = fieldSlice.actions;

// Export the reducer to be used in the store
export default fieldSlice.reducer;
