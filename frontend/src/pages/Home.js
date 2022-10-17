import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import { createUser } from '../store/actions/userActions';



 const Home = () => {
   const navigate  = useNavigate();
   const dispatch = useDispatch();
   const userCreate = useSelector((state) => state.userCreate);
   const {
      error: errorCreate,
      success: successCreate,
   } = userCreate;

  useEffect(() => {
      if (successCreate) {
         console.log("here")
         setTimeout(() =>
         navigate("/users")
   , 1000)};
  }, [dispatch, navigate, successCreate])
     
   const formik = useFormik({
     initialValues: {
       firstName: '',
       lastName: '',
       gender: 'Male',
       address :'',
       dateOfBirth :'',
       photo :''
     },
     onSubmit: values => {
        dispatch(
            createUser(
                values
            )
         );
     },
   });

   return (
      <>
      {errorCreate && <Message className='p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800'>{errorCreate}</Message>}
      {successCreate && <Message className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800">User successfully created</Message>}

      <div className="relative  m-auto flex flex-col justify-center">
       <div className="w-full p-1 m-auto bg-white rounded-md shadow-xl  ring-2 ring-indigo-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-indigo-700 uppercase decoration-wavy">
            Add User
        </h1>
          <form className="mt-6" onSubmit={formik.handleSubmit}>
            <div className="mb-2">
             <label   className="block text-sm font-semibold text-gray-800" htmlFor="firstName">FirstName</label>
             <input  className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              id="firstName"name="firstName" type="text" onChange={formik.handleChange} value={formik.values.firstName}/>
          </div>
      
          <div className="mb-2">
             <label   className="block text-sm font-semibold text-gray-800" htmlFor="lastName">LastName</label>
             <input  className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              id="lastName"name="lastName" type="text" onChange={formik.handleChange} value={formik.values.lastName}/>
          </div>

          <div className="mb-2">
             <label   className="block text-sm font-semibold text-gray-800" htmlFor="data">Gender</label>
            


             <select className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={formik.handleChange} value={formik.values.gender}  name="gender" >
                    <option value="DEFAULT" disabled>Select gender...</option>
                    <option value="Male">Male</option>
                    <option  value="Female">Female</option>
             </select>
          </div>


          <div className="mb-2">
             <label   className="block text-sm font-semibold text-gray-800" htmlFor="data">Address</label>
             <textarea  className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              id="address"name="address"  onChange={formik.handleChange} value={formik.values.address}/>
          </div>
          

          <div className="mb-2">
             <label   className="block text-sm font-semibold text-gray-800" htmlFor="data">Date Of Birth</label>
             <input  className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              id="dateOfBirth"name="dateOfBirth" type="date" onChange={formik.handleChange} value={formik.values.dateOfBirth}/>
          </div>


          <div className="mb-2">
             <label   className="block text-sm font-semibold text-gray-800" htmlFor="data">Photo</label>
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
      </>
   );

 };

 export default Home