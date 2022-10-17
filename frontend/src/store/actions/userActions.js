import axios from "axios";
import {
   USER_CREATE_FAIL,
   USER_CREATE_REQUEST,
   USER_CREATE_SUCCESS,
   USER_DELETE_FAIL,
   USER_DELETE_REQUEST,
   USER_DELETE_SUCCESS,
   USER_DETAILS_FAIL,
   USER_DETAILS_REQUEST,
   USER_DETAILS_SUCCESS,
   USER_LIST_FAIL,
   USER_LIST_REQUEST,
   USER_LIST_SUCCESS
} from "./types";

export const listUsers = () => async (dispatch) => {
   try {
      dispatch({ type: USER_LIST_REQUEST });
      const { data } = await axios.get("/api/v1/users");
      setTimeout(() => dispatch({
         type: USER_LIST_SUCCESS,
         payload: data,
      }), 300);
   } catch (error) {
      dispatch({
         type: USER_LIST_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const listUserDetails = (id) => async (dispatch) => {
   try {
      dispatch({ type: USER_DETAILS_REQUEST });

      const { data } = await axios.get(`/api/v1/users/${id}`);
      dispatch({
         type: USER_DETAILS_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: USER_DETAILS_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const createUser = (userData) => async (dispatch) => {
   try {
      console.log(userData);
      let formData = new FormData();
      console.log(JSON.stringify(userData.firstName))
      formData.append('firstName', userData.firstName);
      formData.append('lastName', userData.lastName);
      formData.append('gender', userData.gender);
      formData.append('address', userData.address);
      formData.append('dateOfBirth', userData.dateOfBirth);
      formData.append('photo', userData.photo);

      dispatch({
         type: USER_CREATE_REQUEST,
      });
      const config = {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      };
      const { data } = await axios.post(`/api/v1/users`, formData, config);
      dispatch({
         type: USER_CREATE_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: USER_CREATE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const deleteUser = (id) => async (dispatch) => {
   try {
      dispatch({
         type: USER_DELETE_REQUEST,
      });
      const { data } = await axios.delete(`/api/v1/users/${id}`);
      dispatch({
         type: USER_DELETE_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: USER_DELETE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};
