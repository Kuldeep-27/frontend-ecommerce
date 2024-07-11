import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import toast from "react-hot-toast";

export const getDeliveryInfo = createAsyncThunk(
    "/delivery/getDeliveryInfo",
    async (body) => {
        try{

            const response = await axiosClient.get("/delivery/getDeliveryInfo");
            return response.result;
           
           
    
        } catch(e){
            
        }
    }
)

export const saveDeliveryInfo = createAsyncThunk(
    "/delivery/saveDeliveryInfo",
    async (body) => {
        try{

            const response = await axiosClient.post("/delivery/saveDeliveryInfo",body);
            toast.success("Information Saved");
            return response.result;
           
    
        } catch(e){
            
        }
    }
)

export const particularUserDeliveryInfo = createAsyncThunk(
    "/delivery/particularUserDelivery",
    async (body) => {
        try{

            const response = await axiosClient.post("/delivery/particularUserDelivery",body);
            
            return response.result;
           
           
    
        } catch(e){
        
        }
    }
)







const deliveryInfoSlice = createSlice({
    name:"deliveryInfoSlice",

    initialState:{
       deliveryInfo:{},
       particularDeliveryInfo:{}

    },

    extraReducers: (builder) => {
        builder
        .addCase(getDeliveryInfo.fulfilled, (stat,action) => {
            if(!action.payload)
            return;
            const {address,city,state,country,pincode} = action.payload;
            stat.deliveryInfo={
                address,
                city,
                state,
                country,
                pincode
            }
        })
        .addCase(saveDeliveryInfo.fulfilled, (stat,action) => {
            if(!action.payload)
            return;
            const {address,city,state,country,pincode} = action.payload;
            stat.deliveryInfo={
                address,
                city,
                state,
                country,
                pincode
            }
        })
        .addCase(particularUserDeliveryInfo.fulfilled, (stat,action) => {
            if(!action.payload)
            return;
            const {address,city,state,country,pincode,user} = action.payload;
            stat.particularDeliveryInfo={
                address,
                city,
                state,
                country,
                pincode,
                user
            }
        })

        
       
    }
})

export default deliveryInfoSlice.reducer