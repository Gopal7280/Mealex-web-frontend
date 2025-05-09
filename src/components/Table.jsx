import { useState, useEffect, useMemo } from "react";
import "../styles/Table.css"
import { QrCode } from "./QrCode";
import { Loader } from "../layouts/Loader";
export function TableComponent({column = [], data = [],fullData = [],generate=null, actions = null, pageSize = 5, ...rest }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [loader,setLoader]=useState(false);
  // Watch data changes to reset page if needed
  useEffect(() => {
    try{
    setCurrentPage(1);
    }
    catch(err)
    {
      console.log(err);
    }
    finally{
      // setLoader(false);
    }

  }, [data]);

  // Total pages
  const totalPages = Math.ceil(data.length / pageSize);

  // Slice data for current page
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return { 
     paginated1:data.slice(start, start + pageSize),
      paginated2:fullData.slice(start,start+pageSize)
    };
  }, [data, currentPage, pageSize]);

  // Handle page change
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  
  return (
    <>
    {
      loader?(<Loader/>):(
        <div className="overflow-x-auto" {...rest}>
      <table className="w-full border-collapse mt-2">
        <thead>
          <tr className="bg-gray-200 text-left text-[#2D465B]">
            {column.map((col, index) => (
              <th key={index} className="p-3 cursor-pointer">
                {col}
              </th>
            ))}
            {actions && <th className="p-3 text-center">Actions</th>}
          </tr>
        </thead>
        <tbody className="dark:!text-white">
          {paginatedData.paginated1.length > 0 ? (
            paginatedData.paginated1.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-100" >
                {/* {column.map((colKey, colIndex) => (
                  <td key={colIndex} className="p-3 border-t">
                    {row[colKey] ?? "-"}
                  </td>
                ))} */}
                {
                  Object.keys(row).map((value,index)=>
                  <>
                  {rest.onClickRow?(
                    <td onClick={(e)=>rest.onClickRow(e,row)} className="p-3 cursor-pointer" key={index}>{row[value]}</td>
                  ):(<td className="p-3 cursor-pointer" key={index}>{row[value]}</td>)
                }
                  </>
                  )
                }
                {
                  rest.generateQr?<td><QrCode value={JSON.stringify(fullData[rowIndex])}/></td>:(<></>)
                }
                {generate && (
                  <td className="p-3 border-t">
                    {typeof generate === 'function' ? generate(row) : null}
                  </td>
                )}
                 {actions && (
                  <td className="p-3 border-t">
                    {typeof actions === 'function' ? actions(row) : null}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={column.length + (actions ? 1 : 0)} className="p-4 text-center text-gray-500">
                {"You need to add the "+rest.name+",there is no detail of "+rest.name+" for provided search term"}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            className="px-4 py-2 text-white bg-[#3A5B76] rounded hover:bg-[#2D465B] disabled:opacity-80 disabled:bg-gray-400"
            disabled={currentPage === 1}
            aria-label="Previous Page"
          >
            Previous
          </button>

          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => goToPage(currentPage + 1)}
            className="px-4 py-2 text-white bg-[#3A5B76] rounded hover:bg-[#2D465B] disabled:opacity-80 disabled:bg-gray-400"
            disabled={currentPage === totalPages}
            aria-label="Next Page"
          >
            Next
          </button>
        </div>
      )}
    </div>
      )
    }
    </>
  );
}