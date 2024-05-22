import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from "firebase/auth";
import {auth} from "../firebase";
import toast from "react-hot-toast";

enum AuthActionTypes {
  REGISTER_USER = 'auth/registerUser',
  LOGIN_USER = 'auth/logInUser',
  LOGOUT_USER = 'auth/logOutUser',
  CHECK_AUTH_STATUS = 'auth/checkAuthStatus',
}

interface AuthState {
  user: User | null,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null
};

interface AuthCredentials {
  email: string,
  password: string
}

export const registerUser = createAsyncThunk<User, AuthCredentials, { rejectValue: string }>(
  AuthActionTypes.REGISTER_USER,
  async ({email, password}, {rejectWithValue}) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Successfully registered");
      return userCredential.user;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const logInUser = createAsyncThunk<User, AuthCredentials, { rejectValue: string }>(
  AuthActionTypes.LOGIN_USER,
  async ({email, password}, {rejectWithValue}) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast.success('Successfully logged in');
      return userCredential.user;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const logOutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  AuthActionTypes.LOGOUT_USER,
  async (_, {rejectWithValue}) => {
    try {
      await signOut(auth);
      toast.success('Successfully logged out');
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const checkAuthStatus = createAsyncThunk<User | null, void, { rejectValue: string }>(
  AuthActionTypes.CHECK_AUTH_STATUS,
  async (_, {rejectWithValue}) => {
    return new Promise<User | null>((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      });
    });
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<string>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(logInUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logInUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(logInUser.rejected, (state, action: PayloadAction<string>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.user = null;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(logOutUser.rejected, (state, action: PayloadAction<string>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.status = 'idle';
      });
  },
});

export const authActions = authSlice.actions;

export const authReducer = authSlice.reducer;
