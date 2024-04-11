import React, { useEffect, useState } from 'react'
import PopupBox from '../attributes/Popup'
import AddCategory from './AddCategory'
import { CSpinner } from '@coreui/react'
import useApi from 'src/api'

const AllCategory = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [categories, setCategories] = useState([])
  const [show, setShow] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const { fetchData } = useApi()

  const categoriesPerPage = 1

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetchData(`/admin/categories`, 'get')
      setCategories(response)
      setIsFetching(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddCategory = () => {
    fetchCategories()
  }

  const handleShow = () => {
    setShow(!show)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this Category?')) {
      await fetchData(`/admin/categories/${id}`, 'delete')
      fetchCategories()
    }
  }

  const handleEdit = (id) => {
    setEditingId(id)
    setIsPopupOpen(true)
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
  }

  const renderCategories = (categories, parentTitle = '', depth = 0) => {
    return categories.map((category) => (
      <React.Fragment key={category._id}>
        <tr>
          <td className="px-6 py-4 text-start">
            {parentTitle
              ? Array(depth * 2)
                  .fill('-')
                  .join('')
              : ''}{' '}
            {category.title}
          </td>
          <td className="px-6 py-4 text-start">{category.description}</td>
          <td className="rc-table-cell" style={{ textAlign: 'start' }}>
            <div className="inline-flex items-start w-auto gap-3">
              <button
                title="Edit"
                className="text-base transition duration-200 hover:text-heading"
                onClick={() => handleEdit(category._id)}
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
              <button
                className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
                onClick={() => handleDelete(category._id)}
                title="Delete"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 19.4 22.169"
                  fill="currentColor"
                  width="14"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.4"
                  >
                    <path
                      data-name="Rectangle 2"
                      d="M8.238.7h2.923a2 2 0 012 2v.769h0-6.923 0V2.7a2 2 0 012-2z"
                    ></path>
                    <path data-name="Line 1" d="M.7 3.469h18"></path>
                    <path
                      data-name="Path 77"
                      d="M14.649 21.469h-9.9a1.385 1.385 0 01-1.38-1.279L2.085 3.469h15.231L16.029 20.19a1.385 1.385 0 01-1.38 1.279z"
                    ></path>
                    <path data-name="Line 2" d="M7.623 6.238V18.7"></path>
                    <path data-name="Line 3" d="M11.777 6.238V18.7"></path>
                  </g>
                </svg>
              </button>
            </div>
          </td>
        </tr>
        {category.children &&
          category.children.length > 0 &&
          renderCategories(
            category.children,
            parentTitle ? parentTitle : category.title,
            depth + 1,
          )}
      </React.Fragment>
    ))
  }

  const totalPages = Math.ceil(categories.length / categoriesPerPage)
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

  const indexOfLastCatagory = currentPage * categoriesPerPage
  const indexOfFirstCatagory = indexOfLastCatagory - categoriesPerPage
  const currentCategories = categories.slice(indexOfFirstCatagory, indexOfLastCatagory)

  return (
    <div className="">
      <div className="rounded bg-white p-4 shadow md:p-8 mb-8 flex flex-row items-center justify-between">
        <div className="md:w-1/4">
          <h2 className=" relative text-lg font-semibold text-heading ">All Categories</h2>
        </div>
        <div>
          <button
            onClick={handleShow}
            className="border p-2 rounded-md bg-slate-200 hover:bg-slate-100 font-normal"
          >
            Add Category
          </button>
        </div>
      </div>

      {show && <AddCategory onCall={handleAddCategory} setShow={setShow}/>}

      <div className="mb-8 rounded-lg bg-white bg-light -3 md:p-8">
        <h1 className="font-bold text-xl mb-4"> Your All categories:-</h1>
        {isFetching ? (
          <div className="flex justify-center my-8">
            <CSpinner color="primary" />
          </div>
        ) : (
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-12 py-3 text-start">
                    Title
                  </th>
                  <th scope="col" className=" py-3 text-start">
                    Description
                  </th>
                  <th scope="col" className=" py-3 text-start">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>{renderCategories(currentCategories)}</tbody>
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
      {isPopupOpen && (
        <PopupBox
          onClose={handleClosePopup}
          editingId={editingId}
          onCall={fetchCategories}
          component={'category'}
        />
      )}
    </div>
  )
}

export default AllCategory
