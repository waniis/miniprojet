import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { deletePhoto, listPhotos } from "./../store/actions/photoActions";

const PhotoListPage = () => {
   const photoList = useSelector((state) => state.photoList);
   const { loading, error, photos } = photoList;

   const dispatch = useDispatch();



  const deleteHandler = (id) => {
    dispatch(deletePhoto(id));
 };

 const photoDelete = useSelector((state) => state.photoDelete);
 const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
    message : messageDelete
 } = photoDelete;
 const navigate  = useNavigate();
 useEffect(() => {
  dispatch(listPhotos());
  }, [dispatch, successDelete]);
  
  const columns = useMemo(
    () => [
      {
        Header: "Image",
        accessor: "url",
        Cell: (props) => {
            return (
              <div>
                <img src={props.row.original.url} alt={props.row.original.name} 
                className="rounded-full w-32"
                />
              </div>
            );
          },
      },
      {
        Header: "FirstName",
        Cell: (props) => {
            return (
                props.row.original.user.firstName
            );
          },
      },
      {
        Header: "LastName",
        Cell: (props) => {
            return (
                props.row.original.user.lastName
            );
          },
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          return (
            <div>
              <button type="button"   onClick={() => deleteHandler(props.row.original._id)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
              <button type="button"   onClick={() => navigate("/photos/"+props.row.original._id)} className="focus:outline-none text-white bg-green-700 hover:bg-red-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900">View</button>
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: photos,
  });
  return (
    <>
      {loading && <Loader />}
      {loadingDelete && <Loader />}
      <div className="relative mb-7 mt-5 m-auto flex flex-col justify-center">
        <h1 className="text-3xl font-semibold text-center text-indigo-700 uppercase decoration-wavy">
            Photos
        </h1>
       </div> 
      {errorDelete && <Message className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">{errorDelete}</Message>}
      {successDelete && <Message className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800">{messageDelete}</Message>}
      { (!loading  && photos.length < 1) || error ? <Message className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"> No results found!  </Message> : 
      !loading && 
    <div className="list row">
<div className="overflow-x-auto relative">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          {...getTableProps()}
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {headerGroups.map((headerGroup) => (
              <tr  {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th  className="py-3 px-6"{...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td  className="py-3 px-6" {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    }
    </>
  );
};

export default PhotoListPage;