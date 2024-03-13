// import axios from 'axios'
// import React from 'react'
// import { useParams } from 'react-router-dom'
// import config from 'src/config'

// function EditAddress() {
//     const {id} = useParams()


//     const getAddress = () =>{
//         const response = axios.get(`${config.baseURL}`)
//         console.log(response)
//     }
//   return (
//     <>
//       <div className="rounded p-4 shadow md:p-8 mb-8 bg-white justify-between">
//         <h2 className=" relative text-lg font-semibold text-heading ">Edit Address</h2>
//       </div>
//       <div className="rounded p-4 shadow md:p-8 mb-8 bg-white justify-between">
//         <div className="border w-full mt-4 p-2 rounded-md">
//           <table className="table-auto ">
//             <tbody className="">
//               <tr>
//                 <td className="font-semibold pl-2 pr-32">Address :</td>
//                 <td className="pl-4 ">
//                   <input
//                     className="w-full lg:w-80 px-2 py-1 border border-gray-300 rounded focus:outline-blue-400"
//                     type="text"
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td className="font-semibold pl-2 pr-32">State :</td>
//                 <td className="pl-4 ">
//                   <input
//                     className="w-full lg:w-80 px-2 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
//                     type="text"
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td className="font-semibold pl-2 pr-32">Pin Code :</td>
//                 <td className="pl-4 ">
//                   <input
//                     className="w-full lg:w-80 px-2 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
//                     type="text"
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td className="font-semibold pl-2 pr-32">Country :</td>
//                 <td className="pl-4 ">
//                   <input
//                     className="w-full lg:w-80 px-2 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
//                     type="text"
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td className="font-semibold pl-2 pr-32">Phone :</td>
//                 <td className="pl-4 ">
//                   <input
//                     className="w-full lg:w-80 px-2 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
//                     type="text"
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td className="font-semibold pl-2 pr-32">City :</td>
//                 <td className="pl-4 ">
//                   <input
//                     className="w-full lg:w-80 px-2 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
//                     type="text"
//                   />
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         <button
//           className="border p-1 w-24 rounded-md mt-4 bg-slate-200 hover:bg-slate-100 font-normal"
//           // onClick={() => handleEdit(address[0]._id)}
//         >
//           Save
//         </button>
//       </div>
//     </>
//   )
// }

// export default EditAddress
