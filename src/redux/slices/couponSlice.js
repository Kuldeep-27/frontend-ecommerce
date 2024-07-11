import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import toast from "react-hot-toast";

export const getAllCoupons = createAsyncThunk(
    "/coupon/getAllcoupon",
    async (body) => {
        try{
           
            const response = await axiosClient.get("/coupon/allCoupons");
          
            return response.result;
    
        } catch(e){
         
        }
    }
)

export const generateCoupon = createAsyncThunk(
    "/coupon/saveCoupon",
    async (body) => {
        try{
           
            const response = await axiosClient.post("/coupon/saveCoupon",body);
            toast.success("New Coupon Generated Successfully");

            return response.result;
    
        } catch(e){
            
        }
    }
)

export const deleteCoupon = createAsyncThunk(
    "/coupon/delete",
    async (body) => {
        try{
           
            const response = await axiosClient.post("/coupon/delete",body);
          
            toast.success("Coupon Deleted Successfully");

            return body;
    
        } catch(e){
            
        }
    }
)





const couponSlice = createSlice({
    name:"couponSlice",

    initialState:{
       allCoupons:[]

    },

    extraReducers: (builder) => {
        builder
        .addCase(getAllCoupons.fulfilled, (state,action) => {
            state.allCoupons = action.payload;
        })
        .addCase(generateCoupon.fulfilled, (state,action) => {
            const coupon = action.payload;
            state.allCoupons.push(coupon);
            
        })
        .addCase(deleteCoupon.fulfilled, (state,action) => {
            const {couponId} = action.payload;

            const index = state.allCoupons.findIndex((coupon) => coupon._id === couponId);

            state.allCoupons.splice(index,1);
            
        })
       
    }
})

export default couponSlice.reducer