import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import toast from "react-hot-toast"

export const placeOrder = createAsyncThunk(
    "/order/createOrder",
    async (body) => {
        try{

           const response = await axiosClient.post("/order/createOrder",body);
         
           toast.success("Order Placed Successfully");
           
    
        } catch(e){
            
        }
    }
)

export const getUserOrders = createAsyncThunk(
    "/order/getOrders",
    async (body) => {
        try{

           const response = await axiosClient.get("/order/getOrders");
           
        
           return response.result;
           
           
    
        } catch(e){
        
        }
    }
)

export const getAllOrders = createAsyncThunk(
    "/order/getAllOrders",
    async (body) => {
        try{

           const response = await axiosClient.get("/order/getAllOrders");
           
    
           return response.result;
           
           
    
        } catch(e){
            
        }
    }
)

export const getParticularOrder = createAsyncThunk(
    "/order/getParticularOrder",
    async (body) => {
        try{

           const response = await axiosClient.post("/order/getParticularOrder",body);
           
    
           return response.result;
           
           
    
        } catch(e){
            
        }
    }
)

export const changeStatus = createAsyncThunk(
    "/order/changeStatus",
    async (body) => {
        try{

           const response = await axiosClient.post("/order/changeStatus",body);
           toast.success("Status Updated Successfully");
           return body;
           
           
    
        } catch(e){
            
        }
    }
)


export const getMyOrders = createAsyncThunk(
    "/order/getMyOrders",
    async (body) => {
        try{

           const response = await axiosClient.get("/order/getMyOrders");
           

           return response.result;
           
           
    
        } catch(e){
            
        }
    }
)

export const getMyParticularOrder = createAsyncThunk(
    "/order/getMyParticularOrder",
    async (body) => {
        try{

           const response = await axiosClient.post("/order/getMyParticularOrder",body);
    
           return response.result;
           
           
    
        } catch(e){
            
        }
    }
)









const orderSlice = createSlice({
    name:"orderSlice",

    initialState:{
       orderInfo:{},
       allOrders:[],
       particularOrder:{},
       myOrders: null,
       myParticularOrder:null

    },

    extraReducers: (builder) => {
        builder
        .addCase(placeOrder.fulfilled, (state,action) => {
          
            
        })
        .addCase(getUserOrders.fulfilled, (state,action) => {
           state.orderInfo = action.payload;
        
        })
        .addCase(getAllOrders.fulfilled, (state,action) => {
            state.allOrders = action.payload;
         
         })
         .addCase(getParticularOrder.fulfilled, (state,action) => {
            state.particularOrder = action.payload;
         
         })
         .addCase(getMyOrders.fulfilled, (state,action) => {
            state.myOrders = action.payload;
         
         })
         .addCase(getMyParticularOrder.fulfilled, (state,action) => {
            state.myParticularOrder = action.payload;
         
         })
         
       
        
       
    }
})

export default orderSlice.reducer