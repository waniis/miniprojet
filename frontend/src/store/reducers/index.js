import { combineReducers } from "redux";
import { photoDeleteReducer, photoDetailsReducer, photoListReducer, photoUpdateReducer } from "./photoReducers";
import {
   userCreateReducer,
   userDeleteReducer,
   userDetailsReducer,
   userListReducer
} from "./userReducers";

export default combineReducers({
   userList: userListReducer,
   userDetails: userDetailsReducer,
   userCreate: userCreateReducer,
   userDelete: userDeleteReducer,
   photoList: photoListReducer,
   photoDelete: photoDeleteReducer,
   photoDetails: photoDetailsReducer,
   photoUpdate: photoUpdateReducer,
});
