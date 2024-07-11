import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const getUserInfo = createAsyncThunk(
    "/user/userInfo",
    async (body) => {
        try{
           
           const response = await axiosClient.get("/user/userInfo");
           return response.result;
    
        } catch(e){
            
        }
    }
)







const userSlice = createSlice({
    name:"userSlice",

    initialState:{
       userInfo : {}

    },

    extraReducers: (builder) => {
        builder
        .addCase(getUserInfo.fulfilled, (state,action) => {
            state.userInfo = action.payload;
        })
       
       
    }
})

export default userSlice.reducer