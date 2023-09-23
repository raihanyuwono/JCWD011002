import { configureStore } from "@reduxjs/toolkit";
import TriggerReducer from "./TriggerReducer";

const reducer = {
  // Add Reducer Here 
  trigger: TriggerReducer,
};

const Storage = configureStore({ reducer });

export default Storage;
