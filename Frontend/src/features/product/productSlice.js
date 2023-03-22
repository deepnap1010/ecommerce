import { createSlice, createAsyncThunk,createAction } from "@reduxjs/toolkit";
import productService from "./productService";
import { useDispatch } from "react-redux";

export const getProducts = createAsyncThunk(
  "product/get-products",
  async (query,thunkAPI) => {
    try {
      return await productService.getProducts(query);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/create-product",
  async (productData, thunkAPI) => {
    try {
      return await productService.createProduct(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const setQueryParams = createAsyncThunk(
  "product/set-query-params",
  async ({ param, value }, thunkAPI) => {
    console.log(param,value)
    const state = thunkAPI.getState().product.query;
    console.log(state)
    const query = new URLSearchParams(state.query);
    const oldParamValue = query.get(param);
    if (oldParamValue !== null) {
      query.delete(param);
    }
    if (value) {
      query.set(param, value);
    }
    const queryString = query.toString();
    thunkAPI.dispatch(setQuery(queryString));
    return queryString;
  }
);
export const updateAProduct = createAsyncThunk(
  "product/update-product",
  async (product, thunkAPI) => {
    try {
      return await productService.updateBrand(product);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const rating=createAsyncThunk(
  "product/rating-product",
  async(value,thunkAPI)=>{
    try{
        return await productService.rating(value)
    }catch(error){
       return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteAProduct = createAsyncThunk(
  "brand/delete-brand",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");


export const getAproduct=createAsyncThunk(
"products/getAproduct",
async(id,thunkAPI)=>{
try{
return await productService.getAproduct(id)
}catch(error){
return thunkAPI.rejectWithValue(error)
}

})



const initialState = {
  products: [],
product:[],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  query: "",
pages:0
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setQuery: (state, action) => {
       // parse the existing query string into an object
       const existingQuery = Object.fromEntries(new URLSearchParams(state.query).entries());
      
       // parse the new query string into an object
       const newQuery = Object.fromEntries(new URLSearchParams(action.payload).entries());
 
       // merge the two objects, overwriting any existing parameters with the new values
       const mergedQuery = { ...existingQuery, ...newQuery };
 
       // convert the merged query object back into a string
       const queryString = new URLSearchParams(mergedQuery).toString();
 
       // update the state with the new query string
       state.query = queryString;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload.products;
state.pages=action.payload.pages
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdProduct = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      }).addCase(getAproduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAproduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.product = action.payload;
           console.log(action.payload)
      })
      .addCase(getAproduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });

  },
});

export default productSlice.reducer;
export const { setQuery } = productSlice.actions;
