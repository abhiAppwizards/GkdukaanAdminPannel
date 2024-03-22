import React, { useState } from 'react'
import ImgComponent from './ImgComponent'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import config from 'src/config'
import MultiSelectorDropdown from './MultiSelectorDropdown'
import MultiSelectorProductDropdown from './MultiSelectorProductDropdown'
import { CSpinner } from '@coreui/react'

function Home() {
  const [loading, setLoading] = useState(false)
  const [sections, setSections] = useState([])
  const [topSlider, setTopSlider] = useState([{}])
  const [topBanner, setTopBanner] = useState([{}])
  const [categorySliderId, setCategorySliderId] = useState([{}])
  const [secondBanner, setSecondBanner] = useState([{}])

  const [uploadedFileIds, setUploadedFileIds] = useState({})
  const [selectedProData, setSelectedProData] = useState([])

  const token = localStorage.getItem('adminToken')

  const handleSelectedDataChange = (selectedData) => {
    setCategorySliderId(selectedData)
  }

  const handleSelectedProductDataChange = (selectedData) => {
    setSelectedProData(selectedData)
  }

  const handleFileUpload = (fileId, index) => {
    setLoading(false)
    setUploadedFileIds((prevState) => ({
      ...prevState,
      [index]: fileId,
    }))
  }

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

  const handleTopSliderInputChange = (index, event) => {
    setLoading(false)
    const { name, value } = event.target
    const updatedTopSlider = [...topSlider]
    if (!updatedTopSlider[index]) {
      updatedTopSlider[index] = {}
    }
    updatedTopSlider[index][name] = value
    setTopSlider(updatedTopSlider)
  }

  const handleTopBannerInputChange = (index, event) => {
    setLoading(false)
    const { name, value } = event.target
    const updatedTopBanner = [...topBanner]
    if (!updatedTopBanner[index]) {
      updatedTopBanner[index] = {}
    }
    updatedTopBanner[index][name] = value
    setTopBanner(updatedTopBanner)
  }

  const handleSecondBanner = (index, event) => {
    setLoading(false)
    const { name, value } = event.target
    const updatedSecondBanner = [...secondBanner]
    if (!updatedSecondBanner[index]) {
      updatedSecondBanner[index] = {}
    }
    updatedSecondBanner[index][name] = value
    setSecondBanner(updatedSecondBanner)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      const formattedTopSlider = topSlider.map((item, index) => ({
        title: item.title,
        link: item.link,
        media_id: uploadedFileIds[index],
      }))
      const formattedTopBanner = topBanner.map((item, index) => ({
        title: item.title,
        link: item.link,
        media_id: uploadedFileIds[index + 3],
      }))
      const formattedSecondBanner = secondBanner.map((item, index) => ({
        title: item.title,
        link: item.link,
        media_id: uploadedFileIds[index + 6],
      }))
      const formattedTopProducts = sections.map((item, index) => ({
        section_name: item.sectionName,
        products: selectedProData,
        url: item.link,
      }))

      const response = await axios.post(
        `${config.baseURL}/admin/home`,
        {
          top_slider: formattedTopSlider,
          top_banner: formattedTopBanner,
          categories_slider: categorySliderId,
          second_banner: formattedSecondBanner,
          top_products: formattedTopProducts,
        },
        {
          headers: {
            authorization: token,
          },
        },
      )
      toast.success('Home Data Uploaded Successfully')
    } catch (error) {
      toast.error(error.message)
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
            <ImgComponent onFileUpload={(fileId) => handleFileUpload(fileId, 0)} name="image1" />
            <input
              placeholder="Title"
              onChange={(e) => handleTopSliderInputChange(0, e)}
              className="w-full lg:w-80 px-2 h-10 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
              name="title"
            />
            <input
              placeholder="Your Link"
              onChange={(e) => handleTopSliderInputChange(0, e)}
              className="w-full lg:w-80 px-2 h-10 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
              name="link"
            />
          </div>
          <div className="mt-8 flex justify-evenly items-center">
            <h1 className="font-semibold">Image 2</h1>
            <ImgComponent onFileUpload={(fileId) => handleFileUpload(fileId, 1)} name="image2" />
            <input
              placeholder="Title"
              onChange={(e) => handleTopSliderInputChange(1, e)}
              className="w-full lg:w-80 px-2 h-10 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
              name="title"
            />
            <input
              placeholder="Your Link"
              onChange={(e) => handleTopSliderInputChange(1, e)}
              className="w-full lg:w-80 px-2 h-10 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
              name="link"
            />
          </div>
          <div className="mt-8 flex justify-evenly items-center">
            <h1 className="font-semibold">Image 3</h1>
            <ImgComponent onFileUpload={(fileId) => handleFileUpload(fileId, 2)} name="image3" />
            <input
              placeholder="Title"
              onChange={(e) => handleTopSliderInputChange(2, e)}
              className="w-full lg:w-80 px-2 h-10 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
              name="title"
            />
            <input
              placeholder="Your Link"
              onChange={(e) => handleTopSliderInputChange(2, e)}
              className="w-full lg:w-80 px-2 h-10 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
              name="link"
            />
          </div>
        </div>
        {/* Top  banner */}
        <div className="rounded bg-white p-4 shadow md:p-8 mb-8 ">
          <h2 className=" relative text-lg font-semibold text-heading ">Top Banner</h2>
          <div className="mt-8 flex justify-evenly items-center">
            <h1 className="font-semibold">Image 1</h1>
            <ImgComponent onFileUpload={(fileId) => handleFileUpload(fileId, 3)} name="image1" />
            <input
              placeholder="Title"
              onChange={(e) => handleTopBannerInputChange(0, e)}
              className="w-full lg:w-80 px-2 h-10 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
              name="title"
            />
            <input
              placeholder="Your Link"
              onChange={(e) => handleTopBannerInputChange(0, e)}
              className="w-full lg:w-80 px-2 h-10 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
              name="link"
            />
          </div>
          <div className="mt-8 flex justify-evenly items-center">
            <h1 className="font-semibold">Image 2</h1>
            <ImgComponent onFileUpload={(fileId) => handleFileUpload(fileId, 4)} name="image1" />
            <input
              placeholder="Title"
              onChange={(e) => handleTopBannerInputChange(1, e)}
              className="w-full lg:w-80 px-2 h-10 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
              name="title"
            />
            <input
              placeholder="Your Link"
              onChange={(e) => handleTopBannerInputChange(1, e)}
              name="link"
              className="w-full lg:w-80 px-2 h-10 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
            />
          </div>
          <div className="mt-8 flex justify-evenly items-center">
            <h1 className="font-semibold">Image 3</h1>
            <ImgComponent onFileUpload={(fileId) => handleFileUpload(fileId, 5)} name="image1" />
            <input
              placeholder="Title"
              onChange={(e) => handleTopBannerInputChange(2, e)}
              name="title"
              className="w-full lg:w-80 px-2 h-10 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
            />
            <input
              placeholder="Your Link"
              onChange={(e) => handleTopBannerInputChange(2, e)}
              name="link"
              className="w-full lg:w-80 px-2 h-10 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
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
            <ImgComponent onFileUpload={(fileId) => handleFileUpload(fileId, 6)} name="image1" />
            <input
              placeholder="Title"
              onChange={(e) => handleSecondBanner(0, e)}
              name="title"
              className="w-full lg:w-80 px-2 h-10 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
            />
            <input
              placeholder="Your Link"
              onChange={(e) => handleSecondBanner(0, e)}
              name="link"
              className="w-full lg:w-80 px-2 h-10 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
            />
          </div>
          <div className="mt-8 flex justify-evenly items-center">
            <h1 className="font-semibold">Image 2</h1>
            <ImgComponent onFileUpload={(fileId) => handleFileUpload(fileId, 7)} name="image1" />
            <input
              placeholder="Title"
              onChange={(e) => handleSecondBanner(1, e)}
              name="title"
              className="w-full lg:w-80 px-2 h-10 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
            />
            <input
              placeholder="Your Link"
              onChange={(e) => handleSecondBanner(1, e)}
              name="link"
              className="w-full lg:w-80 px-2 h-10 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
            />
          </div>
          <div className="mt-8 flex justify-evenly items-center">
            <h1 className="font-semibold">Image 3</h1>
            <ImgComponent onFileUpload={(fileId) => handleFileUpload(fileId, 8)} name="image1" />
            <input
              placeholder="Title"
              onChange={(e) => handleSecondBanner(2, e)}
              name="title"
              className="w-full lg:w-80 px-2 h-10 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
            />
            <input
              placeholder="Your Link"
              onChange={(e) => handleSecondBanner(2, e)}
              name="link"
              className="w-full lg:w-80 px-2 h-10 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
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
                className="border px-4 py-2 rounded bg-black text-white shadow-sm hover:bg-gray-400"
              >
                Add Section
              </button>
            </div>
          </div>
          {sections.map((section, index) => (
            <>
            <div key={index} className=" mt-4 border rounded p-2">
              {/* <div className='w-full'> */}

              <MultiSelectorProductDropdown onSelectData={handleSelectedProductDataChange} />
              {/* </div> */}
              <div className="flex justify-start gap-5 p-2">
                <input
                  placeholder="Section Name"
                  className="w-full ml-1 lg:w-80 px-2 h-10 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
                  name="sectionName"
                  value={section.sectionName}
                  onChange={(e) => handleInputChange(index, e)}
                />
                <input
                  placeholder="Link"
                  className="w-full lg:w-80 px-2 h-10 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
                  name="link"
                  value={section.link}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </div>
            </div>
            <hr className='rounded p-2 border-t-4 border-green-500'></hr>

            </>
          ))}
        </div>
        <button
          type="submit"
          className={`border px-4 py-2 mb-5 rounded bg-${
            loading ? 'gray-500' : 'black'
          } text-white shadow-sm e`}
          disabled={loading}
        >
          {loading ? 'Submit' : 'Submit'}
        </button>
      </form>
    </>
  )
}

export default Home
