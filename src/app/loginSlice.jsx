import { createSlice } from "@reduxjs/toolkit";

const initialState ={ 
    login: false,
    searchkey: '',
    loading: false,
    getAllBlog: [],
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        updateLogin: (state) =>{
            state.login = !state.login;
        },
        setSearchKey: (state, action) => {
            state.searchkey = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setAllBlog: (state, action) => {
            state.getAllBlog = action.payload;
        },
    }
})

export const { updateLogin, setSearchKey, setLoading, setAllBlog } = loginSlice.actions;

export default loginSlice.reducer;
