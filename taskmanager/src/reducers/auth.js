import axios from "axios"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers:{
    loginSuccess(state,action){
      state.token = action.payload.token
    },
    logout(state,action){
      state.token = action.payload
    }
  }
})

const {loginSuccess} = auth.actions;

export const login = async ({userName,password},dispatch) =>{
  const res = await axios.post(`${process.env.REACT_APP_MOCK_SERVER}/login`,{userName,password});
  dispatch(loginSuccess(res.data))
}

export const {logout} = auth.actions
export default auth.reducer;
