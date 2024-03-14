import React, { useState } from 'react'
import ImgComponent from './ImgComponent'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import config from 'src/config'
import MultiSelectorDropdown from './MultiSelectorDropdown'
import MultiSelectorProductDropdown from './MultiSelectorProductDropdown'

function Home() {
  const [loading, setLoading] = useState(false)
  const [sections, setSections] = useState([])
  const [selectedData, setSelectedData] = useState([])
  const [selectedProData, setSelectedProData] = useState([])
  const [uploadedFileId, setUploadedFileId] = useState(null); // State to store fileId


  const token = localStorage.getItem('adminToken')

  const handleSelectedDataChange = (selectedData) => {
    setSelectedData(selectedData)
    console.log('data',selectedData)
  }

  const handleSelectedProductDataChange = (selectedData) => {
    setSelectedProData(selectedData)
  }

  const handleFileUpload = (fileId) => {
    setUploadedFileId(fileId); // Store fileId in state
    console.log('File uploaded home. File ID:', fileId);
  };

  const handleAddSection = (e) => {
    e.preventDefault()
    const newSection = {
      sectionName: '',
      link: '',
      selectedValues: [],
    }
    setSections([...sections, newSection])
  }

  const handleInputChange = (index, event) => {
    const { name, value } = event.target
    const updatedSections = [...sections]
    updatedSections[index][name] = value
    setSections(updatedSections)
  }


  const handleSubmit = async (event) => {
    try {
      const response = await axios.post(`${config.baseURL}/admin/home`, {
        headers: {
          authoriazation: token,
        },
      })
      toast.success('Home Data Uploaded Successfully')
      setLoading(false)
    } catch (error) {
      // console.error(error)
      toast.error(error.message)
      setLoading(false)
    }
  }

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="rounded bg-white p-4 shadow md:p-8 mb-8 ">
          <h2 className=" relative text-lg font-semibold text-heading ">Top Slider Section</h2>
          <div className="mt-8 flex justify-evenly items-center">
            <h1 className="font-semibold">Image 1</h1>
            <ImgComponent onFileUpload={handleFileUpload} name="image1" />
            <input
              placeholder="Title"
              className="border-2 border-gray-400 outline-none  w-96 h-10 rounded-md px-2"
            />
            <input
              placeholder="Your Link"
              className="border-2 border-gray-400 outline-none  w-96 h-10 rounded-md px-2"
            />
          </div>
          <div className="mt-8 flex justify-evenly items-center">
            <h1 className="font-semibold">Image 2</h1>
            <ImgComponent onFileUpload={handleFileUpload} name="image2" />
            <input
              placeholder="Title"
              className="border-2 border-gray-400 outline-none  w-96 h-10 rounded-md px-2"
            />
            <input
              placeholder="Your Link"
              className="border-2 border-gray-400 outline-none  w-96 h-10 rounded-md px-2"
            />
          </div>
          <div className="mt-8 flex justify-evenly items-center">
            <h1 className="font-semibold">Image 3</h1>
            <ImgComponent onFileUpload={handleFileUpload} name="image3" />
            <input
              placeholder="Title"
              className="border-2 border-gray-400 outline-none  w-96 h-10 rounded-md px-2"
            />
            <input
              placeholder="Your Link"
              className="border-2 border-gray-400 outline-none  w-96 h-10 rounded-md px-2"
            />
          </div>
        </div>
        {/* Top  banner */}
        <div className="rounded bg-white p-4 shadow md:p-8 mb-8 ">
          <h2 className=" relative text-lg font-semibold text-heading ">Top Banner</h2>
          <div className="mt-8 flex justify-evenly items-center">
            <h1 className="font-semibold">Image 1</h1>
            <ImgComponent onFileUpload={handleFileUpload} name="image1" />
            <input
              placeholder="Title"
              className="border-2 border-gray-400 outline-none  w-96 h-10 rounded-md px-2"
            />
            <input
              placeholder="Your Link"
              className="border-2 border-gray-400 outline-none  w-96 h-10 rounded-md px-2"
            />
          </div>
          <div className="mt-8 flex justify-evenly items-center">
            <h1 className="font-semibold">Image 2</h1>
            <ImgComponent onFileUpload={handleFileUpload} name="image2" />
            <input
              placeholder="Title"
              className="border-2 border-gray-400 outline-none  w-96 h-10 rounded-md px-2"
            />
            <input
              placeholder="Your Link"
              className="border-2 border-gray-400 outline-none  w-96 h-10 rounded-md px-2"
            />
          </div>
          <div className="mt-8 flex justify-evenly items-center">
            <h1 className="font-semibold">Image 3</h1>
            <ImgComponent onFileUpload={handleFileUpload} name="image3" />
            <input
              placeholder="Title"
              className="border-2 border-gray-400 outline-none  w-96 h-10 rounded-md px-2"
            />
            <input
              placeholder="Your Link"
              className="border-2 border-gray-400 outline-none  w-96 h-10 rounded-md px-2"
            />
          </div>
        </div>
        {/* Catagories Slider */}
        <div className="rounded bg-white p-4 shadow md:p-8 mb-8 ">
          <h2 className=" relative text-lg font-semibold text-heading ">
            Categories Slider Section
          </h2>
          <MultiSelectorDropdown onSelectData={handleSelectedDataChange} />
        </div>
        {/* Second  banner */}
        <div className="rounded bg-white p-4 shadow md:p-8 mb-8 ">
          <h2 className=" relative text-lg font-semibold text-heading ">Second Banner</h2>
          <div className="mt-8 flex justify-evenly items-center">
            <h1 className="font-semibold">Image 1</h1>
            <ImgComponent onFileUpload={handleFileUpload} name="image1" />
            <input
              placeholder="Title"
              className="border-2 border-gray-400 outline-none  w-96 h-10 rounded-md px-2"
            />
            <input
              placeholder="Your Link"
              className="border-2 border-gray-400 outline-none  w-96 h-10 rounded-md px-2"
            />
          </div>
          <div className="mt-8 flex justify-evenly items-center">
            <h1 className="font-semibold">Image 2</h1>
            <ImgComponent onFileUpload={handleFileUpload} name="image2" />
            <input
              placeholder="Title"
              className="border-2 border-gray-400 outline-none  w-96 h-10 rounded-md px-2"
            />
            <input
              placeholder="Your Link"
              className="border-2 border-gray-400 outline-none  w-96 h-10 rounded-md px-2"
            />
          </div>
          <div className="mt-8 flex justify-evenly items-center">
            <h1 className="font-semibold">Image 3</h1>
            <ImgComponent onFileUpload={handleFileUpload} name="image3" />
            <input
              placeholder="Title"
              className="border-2 border-gray-400 outline-none  w-96 h-10 rounded-md px-2"
            />
            <input
              placeholder="Your Link"
              className="border-2 border-gray-400 outline-none  w-96 h-10 rounded-md px-2"
            />
          </div>
        </div>
        {/* Offer Section */}
        <div className="rounded bg-white p-4 shadow md:p-8 mb-8 ">
          <div className="flex justify-between">
            <div>
              <h2 className=" relative text-lg font-semibold text-heading ">Offer Sections</h2>
            </div>
            <div>
              <button
                onClick={handleAddSection}
                className="border px-4 py-2 rounded bg-green-400 text-white hover:bg-gray-400"
              >
                Add Section
              </button>
            </div>
          </div>
          {sections.map((section, index) => (
            <div key={index} className="mt-4 border rounded p-2">
              <MultiSelectorProductDropdown onSelectData={handleSelectedProductDataChange} />
              <div className="flex justify-start p-2">
                <input
                  placeholder="Section Name"
                  className="border-2 px-2 mr-4 border-gray-400 outline-none w-80 mt-2 h-10 rounded-md"
                  name="sectionName"
                  value={section.sectionName}
                  onChange={(e) => handleInputChange(index, e)}
                />
                <input
                  placeholder="Link"
                  className="border-2 px-2 border-gray-400 outline-none w-80 mt-2 h-10 rounded-md"
                  name="link"
                  value={section.link}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </div>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="border px-4 py-2 mb-5 rounded bg-green-400 text-white hover:bg-gray-400"
          disabled={loading}
        >
          {loading ? 'Submiting...' : 'Submit'}
        </button>
      </form>
    </>
  )
}

export default Home
