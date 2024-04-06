import React, { useEffect, useState } from 'react'
import ImgComponent from '../Home/ImgComponent'
import axios from 'axios'
import config from 'src/config'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function CustomerNotice() {

  const [addNotice, setAddNotice] = useState(false)
  const [getAllNotice, setGetAllNotice] = useState([])

  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [loading, setLoading] = useState(false)
  const [fileId, setFileId] = useState()
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)

  const token = localStorage.getItem('adminToken')

  //   const toggleShow = (value) => {
  //     setShow({ ...show, ...value })
  //   }

  const handleAddNotice = async () => {
    setLoading(true)
    try {
      const res = await axios.post(
        `${config.baseURL}/notice`,
        {
          title: title,
          description: description,
          media_id: fileId,
        },
        {
          headers: {
            authorization: token,
          },
        },
      )
      setLoading(false)
      setAddNotice(false)
      toast.success('Data submitted successfully')
      getNotices()
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getNotices()
  }, [])

  const getNotices = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${config.baseURL}/notice`, {
        headers: {
          authorization: token,
        },
      })
      setGetAllNotice(res.data.customerNotices)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${config.baseURL}/notice/${id}`,{
        headers:{
          authorization:token,
        }
      });
      getNotices(); 
      toast.success('Notice deleted successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const handleShow = () => {
    setAddNotice(!addNotice)
  }

  const toggleAccordion = (id) => {
    setIsAccordionOpen(id === isAccordionOpen ? null : id);
  };

  const handleFileUpload = (fileId) => {
    setFileId(fileId)
  }

  return (
    <>
      <ToastContainer />
      <div className="bg-white w-full flex  items-center justify-between  rounded p-4">
        <h1 className="font-semibold text-lg">Customer Notice</h1>
        <button onClick={handleShow} className="border p-2 rounded bg-gray-300 hover:bg-gray-200">
          Add Notice
        </button>
      </div>
      {addNotice && (
        <div className="rounded mt-3 shadow py-2 px-4 mb-8 bg-white justify-between">
          <div className="flex mt-4 lg:flex-row lg:justify-between">
            <div className="lg:mr-3">
              <label className="block">
                <span className="block">
                  Title<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                className="w-full lg:w-80 px-3 py-2 border border-gray-300 rounded focus:outline-blue-400"
                type="text"
              />
            </div>
            <div className="mb-3 lg:mr-3 ">
              <label className="block">
                <span className="block">
                  Upload Image <span className="text-red-500">*</span>
                </span>
              </label>
              <div className="flex">
                <ImgComponent
                  onFileUpload={(fileId) => handleFileUpload(fileId)}
                  name="image2"
                  className="w-full h-full object-cover rounded"
                />
              </div>
            </div>
            <div>
              <label className="block">
                <span className="block">
                  Description<span className="text-red-500">*</span>
                </span>
              </label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                className="w-full lg:w-80 px-3 py-2 border border-gray-300 rounded focus:outline-blue-400"
                rows="4"
              ></textarea>
            </div>
          </div>
          <button
            onClick={handleAddNotice}
            className="border px-3 py-1 rounded mb-2 bg-gray-300 hover:bg-gray-200"
            disabled={loading}
          >
            {loading ? 'Submiting...' : 'Submit'}
          </button>
        </div>
      )}
      {getAllNotice?.map((notice) => (
        <div key={notice._id} className="bg-slate-500 w-full mt-3  rounded px-4 py-2">
          <div
            className="cursor-pointer flex items-center  justify-between"
            onClick={() => toggleAccordion(notice._id)}
          >
            <h3 className="text-lg font-semibold text-white">{notice.title}</h3>
            <div className="bg-white p-2 flex rounded-full items-center">
              <button
                onClick={() => handleDelete(notice._id)}
                className="text-red-600 transition duration-200 hover:text-red-300 focus:outline-none"
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
          {isAccordionOpen === notice._id && (
            <div className="mt-3 bg-white rounded p-2">
              <h2 className="font-semibold mr-2">Description : </h2>
              <p>{notice.description}</p>
            </div>
          )}
        </div>
      ))}
    </>
  )
}

export default CustomerNotice
