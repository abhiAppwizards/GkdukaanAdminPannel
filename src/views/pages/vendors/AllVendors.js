import React, { useEffect, useState } from 'react'
import config from 'src/config'
import axios from 'axios'
import VendorView from './vendorView'
import VendorPopup from './vendorPopup'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AllVendors = ({}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [vendors, setVendores] = useState([])
  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [isVendorViewOpen, setIsVendorViewOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const vendorsPerPage = 10

  useEffect(() => {
    AllVendors()
  }, [])

  const AllVendors = async () => {
    try {
      const response = await axios.get(`${config.baseURL}/admin/vendor`)
      console.log('vendor get', response.data)
      setVendores(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = (id) => {
    setEditingId(id)
    setIsPopupOpen(true)
  }

  const handleToast = (message) => {
    setToastMessage(message)
    setTimeout(() => {
      setToastMessage('')
    }, 1500)
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
  }

  const totalPages = Math.ceil(vendors.length / vendorsPerPage)
  const handleClick = (type) => {
    if (type === 'prev') {
      setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
    } else if (type === 'next') {
      setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)
    }
  }

  const renderPageNumbers = () => {
    let pages = []
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1) ||
        (i === currentPage - 2 && currentPage > 2) ||
        (i === currentPage + 2 && currentPage < totalPages - 1)
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`px-3 py-1 rounded-full mx-1 focus:outline-none ${
              currentPage === i ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-200'
            }`}
          >
            {i}
          </button>,
        )
      } else if (i === currentPage - 3 || i === currentPage + 3) {
        pages.push(
          <span key={i} className="mx-1">
            ...
          </span>,
        )
      }
    }
    return pages
  }

  const indexOfLastProduct = currentPage * vendorsPerPage
  const indexOfFirstProduct = indexOfLastProduct - vendorsPerPage
  const currentvendors = vendors.slice(indexOfFirstProduct, indexOfLastProduct)

  return (
    <div className="">
      <ToastContainer />
      <div className="rounded bg-white p-4 shadow md:p-8 mb-8 flex flex-row items-center justify-between">
        <div className="md:w-1/4">
          <h2 className=" relative text-lg font-semibold text-heading ">All Vendors</h2>
        </div>
      </div>
      <div className="mb-8 rounded-lg bg-white bg-light -3 md:p-8">
        <div className='flex justify-between'>
          <h1 className="font-bold text-xl mb-4"> Your All Vendors:-</h1>
          {toastMessage && <div className='px-3 rounded-full bg-green-500 text-white mb-3 border flex items-center justify-center'>{toastMessage}</div>}

        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  Vendors IDs
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Account Status
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Store Name
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentvendors.map((vendor) => (
                <tr
                  key={vendor._id}
                  className="hover:bg-gray-100 bg-white border-b dark:bg-gray-800  dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 text-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {vendor._id}
                  </th>
                  <td className="text-center">
                    <div className="flex justify-center items-center rtl:space-x-reverse">
                      <span className="inline-block px-3 text-center py-1.5 rounded bg-red-600 text-xs whitespace-nowrap relative font-medium text-dark bg-accent bg-opacity-10 !text-accent capitalize">
                        {vendor.account_status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">{vendor.email}</td>
                  <td className="px-6 py-4 text-center">{vendor.phoneNumber}</td>
                  <td className="px-6 py-4 text-center">{vendor.store_name}</td>
                  <td className="rc-table-cell" style={{ textAlign: 'center' }}>
                    <div className="inline-flex items-center w-auto gap-3">
                      <button
                        title="Edit"
                        className="text-base transition duration-200 hover:text-heading"
                        onClick={() => handleEdit(vendor._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20.547 20.299"
                          fill="currentColor"
                          width="15"
                        >
                          <g stroke="currentColor" strokeWidth=".4">
                            <path
                              data-name="Path 78"
                              d="M18.659 12.688a.5.5 0 00-.5.5v4.423a1.5 1.5 0 01-1.494 1.494H2.691A1.5 1.5 0 011.2 17.609V4.629a1.5 1.5 0 011.494-1.494h4.419a.5.5 0 100-1H2.691A2.493 2.493 0 00.2 4.629v12.98A2.493 2.493 0 002.691 20.1h13.976a2.493 2.493 0 002.491-2.491v-4.423a.5.5 0 00-.5-.5zm0 0"
                            ></path>
                            <path
                              data-name="Path 79"
                              d="M18.96.856a2.241 2.241 0 00-3.17 0L6.899 9.739a.5.5 0 00-.128.219l-1.169 4.219a.5.5 0 00.613.613l4.219-1.169a.5.5 0 00.219-.128l8.886-8.887a2.244 2.244 0 000-3.17zm-10.971 9.21l7.273-7.273 2.346 2.346-7.273 7.273zm-.469.94l1.879 1.875-2.592.718zm11.32-7.1l-.528.528-2.346-2.345.528-.528a1.245 1.245 0 011.761 0l.585.584a1.247 1.247 0 010 1.761zm0 0"
                            ></path>
                          </g>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              <VendorView
                isOpen={isVendorViewOpen}
                onClose={() => setIsVendorViewOpen(false)}
                vendorId={selectedVendorId}
              />
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handleClick('prev')}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-full mx-1 focus:outline-none ${
              currentPage === 1
                ? 'opacity-50 cursor-not-allowed'
                : 'text-blue-500 hover:bg-blue-200'
            }`}
          >
            Prev
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => handleClick('next')}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-full mx-1 focus:outline-none ${
              currentPage === totalPages
                ? 'opacity-50 cursor-not-allowed'
                : 'text-blue-500 hover:bg-blue-200'
            }`}
          >
            Next
          </button>
        </div>
      </div>
      {isPopupOpen && (
        <VendorPopup
          onClose={handleClosePopup}
          editingId={editingId}
          onCall={AllVendors}
          onToast={handleToast}
        />
      )}
    </div>
  )
}

export default AllVendors
