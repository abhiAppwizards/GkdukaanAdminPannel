import React, { useEffect, useState } from 'react'
import { CSpinner } from '@coreui/react'
import { Button } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import useApi from 'src/api'
function Support() {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tickets, setTickets] = useState([])
  const [isFetching, setIsFetching] = useState(true)
  const [selectedVendor, setSelectedVendor] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })
  const [vendors, setVendors] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleDelete = async (id) => {
    try {
      // await fetchData(`/reviews/${id}`,'delete')
      // getReviews()
    } catch (error) {
      console.log(error)
    }
  }

  const navigate = useNavigate()

  const { fetchData } = useApi()

  const handleShow = () => {
    setShow(!show)
  }

  useEffect(() => {
    getTickits()
  }, [])
  useEffect(() => {
    getVendors()
  }, [])

  const getTickits = async () => {
    try {
      const res = await fetchData(`/admin/settings/support-ticket`, 'get')
      setIsFetching(false)
      setTickets(res)
    } catch (error) {
      console.log(error)
    }
  }

  const getVendors = async () => {
    try {
      const res = await fetchData(`/admin/vendor`, 'get')
      setVendors(res)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetchData(`/admin/settings/support-ticket`, 'post', {
        title: formData.title,
        description: formData.description,
        vendor_id: selectedVendor,
      })
      getTickits()
      toast.success('Support added successfully')
      setLoading(false)
    } catch (error) {
      toast.error(error.response.data.message)
      setLoading(false)
    }
  }

  return (
    <>
      {loading ? (
        <CSpinner className="text-blue-600" />
      ) : (
        <div>
          <ToastContainer />
          <div className="rounded bg-white p-3 shadow md:p-8 mb-8 flex flex-row items-center justify-between">
            <div className="md:w-1/4">
              <h2 className=" relative text-lg font-semibold text-heading ">Support</h2>
            </div>
            <div>
              <button
                onClick={handleShow}
                className="border p-2 rounded-md bg-slate-200 hover:bg-slate-100 font-normal"
              >
                Add Support
              </button>
            </div>
          </div>

          {show && (
            <div className="rounded p-4 shadow md:p-8 mb-8 bg-white justify-between">
              <div className="mt-1">
                <div className="d-flex justify-between">
                  <div className="d-inline-block mb-1">
                    <span style={{ display: 'block' }}>
                      Title<span style={{ color: 'red' }}>*</span>
                    </span>
                    <input
                      className="w-full lg:w-80 px-2 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
                      // style={{ width: '550px' }}
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-80">
                    <span className="mb-2" style={{ display: 'block' }}>
                      Select Vendor<span style={{ color: 'red' }}>*</span>
                    </span>{' '}
                    <Select
                      value={selectedVendor.label}
                      onChange={(selectedOption) => {
                        setSelectedVendor(selectedOption.value)
                      }}
                      options={vendors.map((vendor) => ({
                        value: vendor._id,
                        label: vendor.store_name,
                      }))}
                      isSearchable
                      placeholder="Search..."
                      styles={{
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: 'white',
                          color: 'black',
                        }),
                        control: (provided, state) => ({
                          ...provided,
                        }),
                        menu: (provided, state) => ({
                          ...provided,
                        }),
                      }}
                    />
                  </div>
                  <div className="d-inline-block">
                    <span style={{ display: 'block' }}>
                      Description<span style={{ color: 'red' }}>*</span>
                    </span>
                    <textarea
                      className="w-full lg:w-80 px-2 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
                      // style={{ width: '550px' }}
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <Button className="text-blue-500" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </div>
          )}
          <div className="rounded bg-white p-4 shadow md:p-8 mb-8">
            <h2 className="text-lg font-semibold mb-4">All Ticket IDs</h2>
            {isFetching ? (
              <div className="flex justify-center my-8">
                <CSpinner color="primary" />
              </div>
            ) : (
              <div>
                {tickets &&
                  tickets.map((ticket) => (
                    <div key={ticket._id} className="mb-2 flex justify-between gap-3 ">
                      <div className=' w-full '>
                      <Link to={`/support/messages/${ticket._id}`}>
                        <div className="rounded bg-white p-3 shadow w-full md:p-4"><span>{ticket._id}</span></div>
                      </Link>
                      </div>
                      <div className="inline-flex min-w-14 justify-center rounded-full border shadow-md hover:bg-red-300">
                        <button
                          onClick={() => handleDelete(ticket._id)} 
                          className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
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
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Support
