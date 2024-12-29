import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../store"

options: ["USA", "Canada", "Mexico"]

export interface Options{
  options: null | string[];
  placeholder : null | string;
}

export interface Field {
    id: number;
    label: string;
    inputtype: string;
    type:string;
    required:boolean;
    options: null | Options;
}
  

export interface FieldState {
    formid:number
    fields:Field[],
    editId: number,  
}

const initialState: FieldState = {
    formid: -1,
    fields: [
        // { id: 1, label: "title",inputtype:"text", type:"title", reqired:true },
    ],
    editId:0,
};

const fieldSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {
    addingField(state, action: PayloadAction<Field>) {
      const field = action.payload
      if(field.required === undefined){
        field.required = false
      }
      if(field.options === undefined){
        field.options = null
      }
      state.fields.push(field);

    },

    clearFields(state) {
        state.fields=[]
    },

    updateField(state, action: PayloadAction<Field[]>) {
        state.fields=action.payload
    },

    updateFieldOfID(state, action: PayloadAction<string>) {
      const field = state.fields.find((field: Field) => field.id === state.editId);
      if (field) {
        field.label = action.payload;
      }
    },

    updatePlaceholderOfID(state, action: PayloadAction<string>) {
      const field = state.fields.find((field: Field) => field.id === state.editId);
      if (field) {
        if(field.options){
          field.options.placeholder = action.payload
        }
        else{
          field.options = {
            options:[],
            placeholder: action.payload
          }
        }
      }
    },

    setRequired(state,action: PayloadAction<boolean>){
      const field = state.fields.find((field: Field) => field.id === state.editId);
      if(field){
        field.required = action.payload
      }
    },

    seteditId(state, action:PayloadAction<number>){
      state.editId=action.payload
    },

    setformId(state, action:PayloadAction<number>){
      state.formid=action.payload
    }

  },
});

export const labelOfeditId = (state: { field: FieldState }): string => {
  const field = state.field.fields.find((field) => field.id === state.field.editId);
  return field?.label || "";
};

// Export actions
export const { addingField,setRequired,updatePlaceholderOfID, updateField  ,clearFields, updateFieldOfID, seteditId, setformId } = fieldSlice.actions;

// Export the reducer to be used in the store
export default fieldSlice.reducer;
