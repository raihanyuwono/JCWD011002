import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: "",
};

export const SearchReducer = createSlice({
  name: "SearchReducer",
  initialState,
  reducers: {
    searchUser: (state, action) => {
      const keyword = action.payload;
      state.users = keyword;
    },
  },
});

export const { searchUser } = SearchReducer.actions;
export default SearchReducer.reducer;
