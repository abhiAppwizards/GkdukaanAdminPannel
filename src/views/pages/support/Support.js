import React, { useEffect, useState } from 'react'
import { CSpinner } from '@coreui/react'
import { Button } from 'react-bootstrap'
import config from 'src/config'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Select from 'react-select'

function Support() {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tickets, setTickets] = useState([])
  const [selectedVendor, setSelectedVendor] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const navigate = useNavigate()

  const token = localStorage.getItem('adminToken')

  const handleShow = () => {
    setShow(!show)
  }

  useEffect(() => {
    getTickits()
  }, [])

  const getTickits = async () => {
    try {
      const res = await axios.get(`${config.baseURL}/admin/settings/support-ticket`, {
        headers: {
          authorization: token,
        },
      })
      // console.log('tickets..', res.data)
      setTickets(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await axios.post(
        `${config.baseURL}/admin/settings/support-ticket`,
        {
          title: formData.title,
          description: formData.description,
          vendor_id: '65ce086a43648af9cc83e96e',
        },
        {
          headers: {
            authorization: token,
          },
        },
      )
      console.log('support data', response.data)
      getTickits()
      toast.success('Support added successfully')
      setLoading(false)
      // navigate('/details/support')
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
                    <span  className='mb-2' style={{ display: 'block' }}>
                      Select Vendor<span style={{ color: 'red' }}>*</span>
                    </span>{' '}
                    <Select
                      value={selectedVendor}
                      onChange={setSelectedVendor}
                      options={selectedVendor}
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
            <div>
              {tickets &&
                tickets.map((ticket) => (
                  <Link to={`/support/messages/${ticket._id}`} key={ticket._id}>
                    <div className="rounded bg-white p-3 shadow md:p-4 mb-2">{ticket._id}</div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Support
