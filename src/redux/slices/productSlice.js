import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import toast from "react-hot-toast";

export const addNewProduct = createAsyncThunk(
    "/product/addNew",
    async (body) => {
        try{
            const response = await axiosClient.post("/product/addNewProduct",body);
            toast.success("New Product Added");
            return response.result;
    
        } catch(e){
            
        }
    }
)


export const getLatestProduct = createAsyncThunk(
    "/product/latest",
    async (body) => {
        try{
            const response = await axiosClient.get("/product/latestProduct");

             return response.result;

        } catch(e){
            
        }
    }
)

export const getAllProducts = createAsyncThunk(
    "/product/all",
    async (body) => {
        try{
            const response = await axiosClient.get("/product/allProducts");
            return response.result;

        } catch(e){
            
        }
    }
)

export const updateProduct = createAsyncThunk(
    "/product/update",
    async (body) => {
        try{
            const response = await axiosClient.post("/product/updateProduct",body);
            toast.success("Product Updated Successfully");
            return response.result;

        } catch(e){
            
        }
    }
)

export const deleteProduct = createAsyncThunk(
    "/product/delete",
    async (body) => {
        try{
            const response = await axiosClient.post("/product/delete",body);
            console.log(response);
            return body;
           // return response.result;

        } catch(e){
            
        }
    }
)

export const getProductInfo = createAsyncThunk(
    "/product/getProductInfo",
    async (body) => {
        try{
            const response = await axiosClient.post("/product/getProductInfo",body);
            console.log(response);
            return response.result;
           

        } catch(e){

        }
    }
)

export const getSearchProducts = createAsyncThunk(
    "/product/searchProduct",
    async (body) => {
        try{
            const response = await axiosClient.post("/product/searchProduct",body);
            
            return response.result;
        

        } catch(e){
    
        }
    }
)







const productSlice = createSlice({
    name:"productSlice",

    initialState:{
        latestProduct:null,
        allProducts:[],
        productInfo:null,
        searchProducts:[]

    },

    extraReducers: (builder) => {
        builder
        .addCase(addNewProduct.fulfilled, (state,action) => {
            state.allProducts.push(action.payload);
        })
        .addCase(getLatestProduct.fulfilled, (state,action) => {
            state.latestProduct = action.payload;
        })
        .addCase(getAllProducts.fulfilled,(state,action) => {
            state.allProducts = action.payload;
        })
        .addCase(updateProduct.fulfilled,(state,action) => {
           const product = action.payload;
           const productId = product._id;

           const index = state.allProducts.findIndex((product) => product._id === productId);

           state.allProducts[index] = product;

           
        })
        .addCase(deleteProduct.fulfilled,(state,action) => {
           
            const {productId} = action.payload;
 
            const index = state.allProducts.findIndex((product) => product._id === productId);
 
            state.allProducts.splice(index,1);
         })
         .addCase(getProductInfo.fulfilled,(state,action) => {
           
            state.productInfo = action.payload;
           
         })
         .addCase(getSearchProducts.fulfilled,(state,action) => {
           
            state.searchProducts = action.payload;
           
         })
    }
})

export default productSlice.reducer