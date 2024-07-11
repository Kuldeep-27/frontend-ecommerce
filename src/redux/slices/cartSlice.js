import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import toast from "react-hot-toast"

export const getUserCart = createAsyncThunk(
    "/cart/items",
    async (body) => {
        try{
            console.log("aya hu");
            const response = await axiosClient.get("/cart/getCartItems");
           
            return response.result;
            

        } catch(e){
            
        }
    }
)

export const addToCart = createAsyncThunk(
    "/cart/add",
    async (body) => {
        try{
            const response = await axiosClient.post("/cart/addToCart",body)
          

            toast.success("Product Added To Cart")
      
          
            return response.result;

        } catch(e){
           
        }
    }
)


export const removeFromCart = createAsyncThunk(
    "/cart/remove",
    async (body) => {
        try{
            const response = await axiosClient.post("/cart/removeFromCart",body)
            
            toast.success("Item Removed From Cart");
          
            return body;

        } catch(e){
            
        }
    }
)

export const incrementQuantity = createAsyncThunk(
    "/cart/increment",
    async (body) => {
        try{
            const response = await axiosClient.post("/cart/incrementQuantity",body)
            
             toast.success(response.result);
          
            return body;

        } catch(e){
           
            
        }
    }
)

export const decrementQuantity = createAsyncThunk(
    "/cart/decrement",
    async (body) => {
        try{
            const response = await axiosClient.post("/cart/decrementQuantity",body)
            
            toast.success(response.result);
          
            return body;

        } catch(e){
           
            
        }
    }
)







const cartSlice = createSlice({
    name:"cartSlice",

    initialState:{
       userItems:null

    },

    extraReducers: (builder) => {
        builder
        .addCase(getUserCart.fulfilled, (state,action) => {
            state.userItems = action.payload;
        })
        .addCase(addToCart.fulfilled,(state,action) => {
            if(!action.payload)
            return;
              state.userItems = action.payload;
           
        })
        .addCase(removeFromCart.fulfilled, (state,action) => {
            const {productId} = action.payload;

            const index = state.userItems.items.findIndex((item) => item.productId._id === productId);

            state.userItems.items.splice(index,1);
        })
        .addCase(incrementQuantity.fulfilled, (state,action) => {
            if(!action.payload)
            return;
            const {productId} = action.payload;

           

            const index = state.userItems.items.findIndex((item) => item.productId._id === productId);

            state.userItems.items[index].quantity++;
        })
        .addCase(decrementQuantity.fulfilled, (state,action) => {
            if(!action.payload)
            return;
            const {productId} = action.payload;
           

            const index = state.userItems.items.findIndex((item) => item.productId._id === productId);

            state.userItems.items[index].quantity--;
        })
       
    }
})

export default cartSlice.reducer