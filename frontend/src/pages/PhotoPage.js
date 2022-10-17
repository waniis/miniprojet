import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listPhotoDetails, updatePhoto } from "./../store/actions/photoActions";

const PhotoPage = () => {
const params = useParams();
const dispatch = useDispatch();
   const formik = useFormik({
      initialValues: {
        photo :''
      },
      onSubmit: values => {
         dispatch(
             updatePhoto(
                 params.id,
                 values
             )
          );
      },
    });

    const photoUpdate = useSelector((state) => state.photoUpdate);
    const {
       error: errorUpdate,
       success: successUpdate,
       photo : updatedPhoto
    } = photoUpdate;

   const photoDetails = useSelector((state) => state.photoDetails);
   const { loading, error, photo } = photoDetails;

   useEffect(() => {
      dispatch(listPhotoDetails(params.id));
   }, [dispatch, params.id , successUpdate]);
   return (
      <>
      {errorUpdate && <Message className='p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800'>{errorUpdate}</Message>}
     <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
      <Link className="btn btn-blue" to="/photos">
      Go Back to My Photos
         </Link>
     
      </button>
      <div className="relative  m-auto flex flex-col justify-center">
         {loading ? (
            <Loader />
         ) : error ? (
            <Message className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">{error}</Message>
         ) : ( 
            <div className="text-center">
            <img
              src={photo?.url? photo.url: ''}
              className="h-48 w-96 mb-4 mx-auto"
              alt={photo?.user? photo.user.firstName +' '+ photo.user.lastName : ''}
            />
            <h5 className="text-xl font-medium leading-tight mb-2">{photo?.user? photo.user.firstName +' '+ photo.user.lastName : ''}</h5>
             <div className="mx-auto">

             <form className="mt-6" onSubmit={formik.handleSubmit}>
             <div className="mb-2">
             <label   className="text-3xl font-semibold text-center text-indigo-700 uppercase decoration-wavy" htmlFor="data"> Change the photo</label>
             <input  className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              id="photo"name="photo"  type="file"   onChange={(event) => {
                formik.setFieldValue("photo", event.currentTarget.files[0]);
              }} />
          </div>
          


          <button  type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
          Submit
                </button>
             </form>
             </div>
          </div>
           
      
         )}
         </div>
      </>
   );
};

export default PhotoPage;
