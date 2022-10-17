import axios from "axios";
import {
   PHOTO_DELETE_FAIL,
   PHOTO_DELETE_REQUEST,
   PHOTO_DELETE_SUCCESS,
   PHOTO_DETAILS_FAIL,
   PHOTO_DETAILS_REQUEST,
   PHOTO_DETAILS_SUCCESS,
   PHOTO_LIST_FAIL,
   PHOTO_LIST_REQUEST,
   PHOTO_LIST_SUCCESS,
   PHOTO_UPDATE_FAIL,
   PHOTO_UPDATE_REQUEST,
   PHOTO_UPDATE_SUCCESS
} from "./types";

export const listPhotos = () => async (dispatch) => {
   try {
      dispatch({ type: PHOTO_LIST_REQUEST });
      const { data } = await axios.get("/api/v1/photos");
      setTimeout(() => dispatch({
         type: PHOTO_LIST_SUCCESS,
         payload: data,
      }), 300);
   } catch (error) {
      dispatch({
         type: PHOTO_LIST_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const deletePhoto = (id) => async (dispatch) => {
    try {
       dispatch({
          type: PHOTO_DELETE_REQUEST,
       });
       const { data } = await axios.delete(`/api/v1/photos/${id}`);
       dispatch({
          type: PHOTO_DELETE_SUCCESS,
          payload: data,
       });
    } catch (error) {
       dispatch({
          type: PHOTO_DELETE_FAIL,
          payload:
             error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
       });
    }
 };
 export const listPhotoDetails = (id) => async (dispatch) => {
   try {
      dispatch({ type: PHOTO_DETAILS_REQUEST });

      const { data } = await axios.get(`/api/v1/photos/${id}`);
      dispatch({
         type: PHOTO_DETAILS_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: PHOTO_DETAILS_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const updatePhoto = (id, photoData) => async (dispatch) => {
   try {
      let formData = new FormData();
      formData.append('photo', photoData.photo);

      dispatch({
         type: PHOTO_UPDATE_REQUEST,
      });
      const config = {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      };
      const { data } = await axios.patch(`/api/v1/photos/${id}`, formData, config);
      dispatch({
         type: PHOTO_UPDATE_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: PHOTO_UPDATE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};