import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: number;
    name: string
    email: string;
    role: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<User>) {
            state.user = action.payload
            state.isAuthenticated = true;
        },

        logout(state) {
            state.user = null;
            state.isAuthenticated = false
        }


    }
})


export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;