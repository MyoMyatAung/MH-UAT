import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface model {
  openLoginModel: boolean;
  openSignupModel: boolean;
  openCaptcha:boolean
}

const initialState: model = {
  openLoginModel: false,
  openSignupModel: false,
  openCaptcha:false
};

export const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
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

export const { setLoginOpen, setSignupOpen,setCaptchaOpen } = modelSlice.actions;

export default modelSlice.reducer;
