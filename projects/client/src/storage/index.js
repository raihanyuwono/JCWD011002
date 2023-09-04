import { configureStore } from "@reduxjs/toolkit";

const reducer = {
  // Add Reducer Here 
  // ex -> report: ReportReducer
};

const Storage = configureStore({ reducer });

export default Storage;
