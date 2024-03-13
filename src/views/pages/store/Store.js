import React, { useState, useRef } from 'react'
import { CFormInput, CSpinner } from '@coreui/react'
import { FaPlus } from 'react-icons/fa'

const Store = () => {
  const [image, setImage] = useState(null)
  const [file, setFile] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formDataToSend = new FormData()
    formDataToSend.append('title', formData.title)
    formDataToSend.append('description', formData.description)
    formDataToSend.append('file', file)

    setFile(null)
    setImage(null)
    setFormData({
      title: '',
      description: '',
    })

    setTimeout(() => {
      alert('File uploaded successfully!')
    }, 1000)
  }

  return (
    <>
      <div className=" rounded bg-white p-3 shadow md:p-8 mb-8 flex flex-row items-center justify-between">
        <h2 className=" relative bg-white text-lg font-semibold text-heading ">Store Profile</h2>
      </div>
      <div className="max-w-xl mx-auto mt-10 p-5 bg-white rounded-lg shadow-md">
        <h1 className="text-xl font-bold mb-2">Update from here</h1>
        <div className="mb-2 relative" onClick={handleImageClick} style={{ cursor: 'pointer' }}>
          {/* Display current image or empty circle with plus icon */}
          {image ? (
            <div className="relative w-32 h-32 rounded-md mx-auto overflow-hidden">
              <img src={image} alt="Profile" className="w-full h-full object-cover" />
              <FaPlus
                className="border rounded-full bg-black absolute top-0 left-0 m-2 text-white"
                size={30}
              />
            </div>
          ) : (
            <div className="w-32 h-32 rounded-full mx-auto bg-gray-200 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-7">
            <div className="d-flex justify-between">
              <div className="d-inline-block mb-3">
                <span style={{ display: 'block' }}>
                  Title<span style={{ color: 'red' }}>*</span>
                </span>
                <CFormInput
                  className="bg-white"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="d-inline-block">
                <span style={{ display: 'block' }}>
                  Description<span style={{ color: 'red' }}>*</span>
                </span>
                <CFormInput
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={!file || !formData.title || !formData.description}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${
              (!file || !formData.title || !formData.description) && 'opacity-50 cursor-not-allowed'
            }`}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default Store
