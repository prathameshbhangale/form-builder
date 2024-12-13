import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  userId: number | null;
  name: string | null;
  email: string | null;
  token: string | null;
}

const initialState: UserState = {
  userId: null,
  name: null,
  email: null,
  token: null,
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
    },

    // Clear user data (e.g., on logout)
    clearUserData(state) {
      state.userId = null;
      state.name = null;
      state.email = null;
      state.token = null;
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
