import React, { useEffect } from 'react'
// import './styles.css'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'
import { CSpinner } from '@coreui/react'
import { FaFilter } from 'react-icons/fa'
import useApi from 'src/api'
import DropDown from './Dropdown'

const optionsData = [
  {
    vendor: [
      { id: 1, name: 'Bhuvan' },
      { id: 2, name: 'Charan' },
      { id: 3, name: 'Chanjad' },
    ],
  },
]

function AllProducts() {
  const [searchText, setSearchText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [allProducts, setAllProducts] = useState([])
  const [allData, setAllData] = useState({})
  const [isFetching, setIsFetching] = useState(true)
  const [showFilter, setShowFilter] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')
  const allProductsPerPage = 10

  const { fetchData } = useApi()

  useEffect(() => {
    getAllProducts()
  }, [])

  const getAllProducts = async () => {
    try {
      const response = await fetchData(`/admin/product`, 'get')
      setAllData(response)
      setIsFetching(false)
      setAllProducts(response.products)
    } catch (error) {
      console.log('error', error)
    }
  }

  const getVendor = async (id) => {
    try {
      const response = await fetchData(`/admin/product/vendor/${id}`, 'get')
      setIsFetching(false)
      setAllProducts(response)
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleChange = (selected) => {
    console.log(selected)
    setSelectedOption(selected)
    getVendor(selected.value)
  }

  const filteredProducts = searchText
    ? allProducts.filter(
        (product) =>
          product && product.name && product.name.toLowerCase().includes(searchText.toLowerCase()),
      )
    : allProducts

  const totalPages = Math.ceil(allProducts?.length / allProductsPerPage)
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

  const indexOfLastProduct = currentPage * allProductsPerPage
  const indexOfFirstProduct = indexOfLastProduct - allProductsPerPage
  const currentallProducts = filteredProducts?.slice(indexOfFirstProduct, indexOfLastProduct)

  return (
    <>
      <ToastContainer />
      <div className="rounded bg-white p-4 shadow md:p-8 mb-8 flex flex-col items-center justify-between md:flex-row">
        <div className="md:mb-0 md:w-1/4">
          <h2 className=" relative text-xl font-semibold text-heading ">All Products</h2>
        </div>
        <div className="flex relative w-full flex-row items-center gap-2 md:w-1/2">
          <div className=" ">
            <div
              onClick={(e) => setShowFilter(!showFilter)}
              className="border p-2 rounded-lg shadow-md  cursor-pointer"
            >
              <FaFilter />
            </div>
            {showFilter && (
              <div className="absolute  left-0 w-full z-30 top-7 ">
                <DropDown
                  className="w-50"
                  placeholder={'Serch by Vendor'}
                  optionsData={allData.uniqueVendors}
                  onChange={handleChange}
                  value={selectedOption.name}
                />
              </div>
            )}
          </div>
          <form noValidate="" role="search" className="relative flex items-center w-full">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <button className="absolute top-1/2 -translate-y-1/2 p-2 text-body outline-none start-1 focus:outline-none active:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
            <input
              type="text"
              id="search"
              name="searchText"
              className="ps-10 pe-4 h-12 flex items-center w-full rounded-md appearance-none transition duration-300 text-heading text-sm focus:outline-none focus:ring-0 border "
              placeholder="Search by Tracking Number"
              aria-label="Search"
              autoComplete="off"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </form>
        </div>
      </div>
      <div className="mb-8 z-10 rounded-lg bg-white bg-light-3 md:p-8">
        {isFetching ? (
          <div className="flex justify-center my-8">
            <CSpinner color="primary" />
          </div>
        ) : (
          <div className="relative z-10 overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">
                    Product Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    MRP
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    SKU
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Pickup Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Stock Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Approvel Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentallProducts?.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-100 bg-white border-b dark:bg-gray-800  dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 text-center py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {product.name}
                    </th>
                    <td className="px-6 py-4 text-center">{product.mrp}</td>
                    <td className="px-6 py-4 text-center">{product.sku}</td>
                    <td className="px-6 py-4 text-center">{product.pickupTimeFormatted}</td>
                    <td className="px-6 py-4 text-center">
                      {product.stock_status ? 'in-Stock' : 'out-of-stock'}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {product.approved ? 'Approved' : 'Rejected'}
                    </td>
                    {/* <td className="text-center">
                      <div className="flex justify-center items-center rtl:space-x-reverse">
                        <span className="inline-block px-3 text-center py-1.5 rounded bg-red-600 text-xs whitespace-nowrap relative font-medium text-dark bg-accent bg-opacity-10 !text-accent capitalize">
                          {product.status}
                        </span>
                      </div>
                    </td> */}

                    <td className="rc-table-cell" style={{ textAlign: 'center' }}>
                      <div className="inline-flex items-center w-auto gap-3">
                        <Link
                          title="Preview"
                          rel="noreferrer"
                          className="text-base transition duration-200 hover:text-heading"
                          // to={`/orders/all/views/${product._id}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            width="18"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            ></path>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            ></path>
                          </svg>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
    </>
  )
}

export default AllProducts
