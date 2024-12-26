import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  userId: number | null;
  name: string ;
  email: string ;
  token: string ;
}

const initialState: UserState = {
  userId: null,
  name: "",
  email: "",
  token: localStorage.getItem('token') || "",
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Set user data (e.g., after login)
    setUserData(state, action: PayloadAction<UserState>) {
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      if(action.payload.token)
        localStorage.setItem('token', action.payload.token);
    },

    // Clear user data (e.g., on logout)
    clearUserData(state) {
      state.userId = null;
      state.name = "";
      state.email = "";
      state.token = "";
    },

    // Update user information (optional, e.g., after user updates profile)
    updateUserData(state, action: PayloadAction<Partial<UserState>>) {
      state.name = action.payload.name ?? state.name;
      state.email = action.payload.email ?? state.email;
    },

    // Set the token (e.g., after login)
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

// Export actions
export const { setUserData, clearUserData, updateUserData, setToken } = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;
