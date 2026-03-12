import { UserResponseDTO } from "@/types/entities/user/UserResponseDTO";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AuthState {
    user: UserResponseDTO | null;
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
        loginSuccess(state, action: PayloadAction<UserResponseDTO>) {
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