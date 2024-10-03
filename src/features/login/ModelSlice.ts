import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface model {
  openAuthModel: boolean;
  openLoginModel: boolean;
  openSignupModel: boolean;
  openCaptcha: boolean;
}

const initialState: model = {
  openAuthModel: false,
  openLoginModel: false,
  openSignupModel: false,
  openCaptcha: false,
};

export const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    setAuthModel: (state, action) => {
      state.openAuthModel = action.payload;
    },
    setLoginOpen: (state, action) => {
      state.openLoginModel = action.payload;
    },
    setSignupOpen: (state, action) => {
      state.openSignupModel = action.payload;
    },
    setCaptchaOpen: (state, action) => {
      state.openCaptcha = action.payload;
    },
  },
});

export const { setLoginOpen, setSignupOpen, setCaptchaOpen, setAuthModel } =
  modelSlice.actions;

export default modelSlice.reducer;
