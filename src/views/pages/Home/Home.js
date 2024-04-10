import React, { useEffect, useState } from 'react'
import ImgComponent from './ImgComponent'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MultiSelectorDropdown from './MultiSelectorDropdown'
import MultiSelectorProductDropdown from './MultiSelectorProductDropdown'
import useApi from 'src/api'
import { CSpinner } from '@coreui/react'
import { FaTimes } from 'react-icons/fa'

const Home = () => {
  const [sections, setSections] = useState([])
  const [topSlider, setTopSlider] = useState([{}])
  const [topBanner, setTopBanner] = useState([{}])
  const [categorySliderId, setCategorySliderId] = useState([{}])
  const [uirender, setUirender] = useState(true)
  const [secondBanner, setSecondBanner] = useState([{}])
  const [topSliderUploadFileIds, setTopSliderUploadedFileIds] = useState({})
  const [topBannerUploadFileIds, setTopBannerUploadedFileIds] = useState({})
  const [secondBannerUploadFileIds, setSecondBannerUploadedFileIds] = useState({})
  const [selectedProData, setSelectedProData] = useState([])
  const { loading, setLoading, error, fetchData } = useApi()

  useEffect(() => {
    getAllData()
  }, [])

  const handleSelectedDataChange = (selectedData) => {
    setCategorySliderId(selectedData)
  }

  const handleSelectedProductDataChange = (selectedData, index) => {
    sections[index].products = selectedData
    // console.log('sections..... ', selectedData)
  }

  const handleTopSliderFileUpload = (fileId, index) => {
    setLoading(false)
    setTopSliderUploadedFileIds((prevState) => ({
      ...prevState,
      [index]: fileId,
    }))
  }
  const handleTopBannerFileUpload = (fileId, index) => {
    setLoading(false)
    setTopBannerUploadedFileIds((prevState) => ({
      ...prevState,
      [index]: fileId,
    }))
  }
  const handleSecondBannerFileUpload = (fileId, index) => {
    setLoading(false)
    setSecondBannerUploadedFileIds((prevState) => ({
      ...prevState,
      [index]: fileId,
    }))
  }

  const handleAddSection = (e) => {
    e.preventDefault()
    const newSection = {
      section_name: '',
      url: '',
      selectedValues: [],
    }
    setSections([...sections, newSection])
  }

  const handleRemoveSection = (indexToRemove) => {
    setSections(sections.filter((_, index) => index !== indexToRemove))
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
        media_id: topSliderUploadFileIds[index] ? topSliderUploadFileIds[index] : item.media_id._id,
      }))
      const formattedTopBanner = topBanner.map((item, index) => ({
        title: item.title,
        link: item.link,
        media_id: topBannerUploadFileIds[index] ? topBannerUploadFileIds[index] : item.media_id._id,
      }))
      const formattedSecondBanner = secondBanner.map((item, index) => ({
        title: item.title,
        link: item.link,
        media_id: secondBannerUploadFileIds[index]
          ? secondBannerUploadFileIds[index]
          : item.media_id._id,
      }))
      const formattedTopProducts = sections.map((item, index) => ({
        section_name: item.section_name,
        products: item.products.map((product) => product._id),
        url: item.url,
      }))

      // console.log('formattedTopProducts',formattedTopProducts)

      const response = await fetchData(`/admin/home`, 'post', {
        top_slider: formattedTopSlider,
        top_banner: formattedTopBanner,
        categories_slider: categorySliderId,
        second_banner: formattedSecondBanner,
        top_products: formattedTopProducts,
      })
      // console.log('res...',response)
      toast.success('Home Data Uploaded Successfully')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getAllData = async () => {
    try {
      const res = await fetchData('/admin/home', 'get')
      // console.log('home....', res[0])
      if (res && res.length > 0) {
        const { top_slider, top_banner, categories_slider, second_banner, top_products } = res[0]
        setTopSlider(top_slider || [])
        setTopBanner(top_banner || [])
        setCategorySliderId(categories_slider || [])
        setSecondBanner(second_banner || [])
        setSections(top_products || [])
      }
      setUirender(false)
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <ToastContainer />
      {uirender ? (
        <div className="flex justify-center my-20">
          <CSpinner color="primary" />
        </div>
      ) : (
        <div>
          {/* Top Slider Section */}
          <div className="rounded bg-white p-4 shadow md:p-8 mb-8 ">
            <h2 className=" relative text-lg font-semibold text-heading ">Top Slider Section</h2>
            {topSlider.map((item, index) => {
              // console.log('item....',item)
              return (
                <div key={index} className="mt-8 flex justify-evenly items-center">
                  <h1 className="font-semibold">Image 1</h1>
                  {item.media_id && item.media_id.url && (
                    <ImgComponent
                      imageUrl={item.media_id?.url}
                      onFileUpload={(fileId) => handleTopSliderFileUpload(fileId, index)}
                      name="image1"
                    />
                  )}
                  <input
                    placeholder="Title"
                    onChange={(e) => handleTopSliderInputChange(index, e)}
                    className="w-full lg:w-80 px-2 h-10 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
                    value={item.title || ''}
                    name="title"
                  />
                  <input
                    placeholder="Your Link"
                    onChange={(e) => handleTopSliderInputChange(index, e)}
                    className="w-full lg:w-80 px-2 h-10 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
                    value={item.link || ''}
                    name="link"
                  />
                </div>
              )
            })}
          </div>
          {/* Top  banner */}
          <div className="rounded bg-white p-4 shadow md:p-8 mb-8 ">
            <h2 className=" relative text-lg font-semibold text-heading ">Top Banner</h2>
            {topBanner.map((item, index) => {
              // console.log('topBanner', item)
              return (
                <div key={index} className="mt-8 flex justify-evenly items-center">
                  <h1 className="font-semibold">Image 1</h1>
                  {item.media_id && item.media_id.url && (
                    <ImgComponent
                      imageUrl={item.media_id.url}
                      onFileUpload={(fileId) => handleTopBannerFileUpload(fileId, index)}
                      name="image1"
                    />
                  )}
                  <input
                    placeholder="Title"
                    onChange={(e) => handleTopBannerInputChange(index, e)}
                    className="w-full lg:w-80 px-2 h-10 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
                    value={item.title || ''}
                    name="title"
                  />
                  <input
                    placeholder="Your Link"
                    onChange={(e) => handleTopBannerInputChange(0, e)}
                    className="w-full lg:w-80 px-2 h-10 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
                    value={item.link || ''}
                    name="link"
                  />
                </div>
              )
            })}
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
            {secondBanner.map((item, index) => {
              return (
                <div key={index} className="mt-8 flex justify-evenly items-center">
                  <h1 className="font-semibold">Image 1</h1>
                  {item.media_id && item.media_id.url && (
                    <ImgComponent
                      imageUrl={item.media_id.url}
                      onFileUpload={(fileId) => handleSecondBannerFileUpload(fileId, index)}
                      name="image1"
                    />
                  )}
                  <input
                    placeholder="Title"
                    onChange={(e) => handleSecondBanner(index, e)}
                    name="title"
                    value={item.title || ''}
                    className="w-full lg:w-80 px-2 h-10 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
                  />
                  <input
                    placeholder="Your Link"
                    onChange={(e) => handleSecondBanner(index, e)}
                    name="link"
                    value={item.link || ''}
                    className="w-full lg:w-80 px-2 h-10 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
                  />
                </div>
              )
            })}
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
                <div className=" mt-4 border rounded p-2 relative">
                  <button className='border rounded bg-red-500 absolute top-0 right-0 hover:bg-red-300 p-1' onClick={() => handleRemoveSection(index)}>
                    <FaTimes />
                  </button>
                  <MultiSelectorProductDropdown
                    products={section.products}
                    onSelectData={handleSelectedProductDataChange}
                    index={index}
                  />
                  <div className="flex justify-start gap-5 p-2">
                    <input
                      placeholder="Section Name"
                      className="w-full ml-1 lg:w-80 px-2 h-10 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
                      name="section_name"
                      value={section.section_name}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                    <input
                      placeholder="Link"
                      className="w-full lg:w-80 px-2 h-10 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
                      name="url"
                      value={section.url}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </div>
                </div>
                <hr className="rounded p-2 border-t-4 border-green-500"></hr>
              </>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className={`border px-4 py-2 mb-5 rounded bg-${
              loading ? 'gray-500' : 'black'
            } text-white shadow-sm e`}
            disabled={loading}
          >
            {loading ? 'Submit' : 'Submit'}
          </button>
        </div>
      )}
    </>
  )
}

export default Home
