import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useApi from 'src/api'
import ImgComponent from '../Home/ImgComponent'
import MultiSelectorDropdown from '../Home/MultiSelectorDropdown'
import MultiSelectorProductDropdown from '../Home/MultiSelectorProductDropdown'

function MobileHome() {
  // const [loading, setLoading] = useState(false)
  const [sections, setSections] = useState([])
  const [topSlider, setTopSlider] = useState([{}])
  const [topBanner, setTopBanner] = useState([{}])
  const [categorySliderId, setCategorySliderId] = useState([{}])
  const [secondBanner, setSecondBanner] = useState([{}])
  const [uploadedFileIds, setUploadedFileIds] = useState({})
  const [topSliderUploadFileIds, setTopSliderUploadedFileIds] = useState({})
  const [topBannerUploadFileIds, setTopBannerUploadedFileIds] = useState({})
  const [secondBannerUploadFileIds, setSecondBannerUploadedFileIds] = useState({})
  const [selectedProData, setSelectedProData] = useState([])
  // const [getHomePageData, setHomePageData] = useState([])

  const { loading, setLoading, error, fetchData } = useApi()

  const handleSelectedDataChange = (selectedData) => {
    console.log('selectedData', selectedData)
    setCategorySliderId(selectedData)
  }

  const handleSelectedProductDataChange = (selectedData) => {
    console.log('selectedProductData', selectedData)
    setSelectedProData(selectedData)
  }

  const handleTopSliderFileUpload = (fileId, index) => {
    // console.log(index)
    setLoading(false)
    setTopSliderUploadedFileIds((prevState) => ({
      ...prevState,
      [index]: fileId,
    }))
  }
  const handleTopBannerFileUpload = (fileId, index) => {
    // console.log(index)
    setLoading(false)
    setTopBannerUploadedFileIds((prevState) => ({
      ...prevState,
      [index]: fileId,
    }))
  }
  const handleSecondBannerFileUpload = (fileId, index) => {
    // console.log(index)
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
        products: selectedProData,
        url: item.url,
      }))
// console.log('categorySliderId... ',categorySliderId)
      // console.log('topSliderUploadFileIds... ', topSliderUploadFileIds)
      // console.log('topBannerUploadFileIds... ', topBannerUploadFileIds)
      // console.log('secondBannerUploadFileIds... ', secondBannerUploadFileIds)
      // console.log('formattedTopSlider... ', formattedTopSlider)
      // console.log('formattedTopBanner... ', formattedTopBanner)
      // console.log('formattedSecondBanner... ', formattedSecondBanner)
      // console.log('formattedTopProducts... ', formattedTopProducts)

      const response = await fetchData(`/admin/home`, 'post', {
        top_slider: formattedTopSlider,
        top_banner: formattedTopBanner,
        categories_slider: categorySliderId,
        second_banner: formattedSecondBanner,
        top_products: formattedTopProducts,
      })
      toast.success('Home Data Uploaded Successfully')
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getAllData()
  }, [])

  const getAllData = async () => {
    try {
      const res = await fetchData('/admin/home', 'get')

      // Initialize state variables with data from the API
      if (res && res.length > 0) {
        const { top_slider, top_banner, categories_slider, second_banner,top_products } = res[0]
        // console.log('top_slider', top_slider)
        setTopSlider(top_slider || [])
        setTopBanner(top_banner || [])
        setCategorySliderId(categories_slider || [])
        setSecondBanner(second_banner || [])
        setSections(top_products || [])
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        {/* Top Slider Section */}
        <div className="rounded bg-white p-4 shadow md:p-8 mb-8 ">
          <h2 className=" relative text-lg font-semibold text-heading ">Top Slider Section</h2>
          {topSlider.map((item, index) => {
            return (
              <div key={index} className="mt-8 flex justify-evenly items-center">
                <h1 className="font-semibold">Image 1</h1>
                {item.media_id && item.media_id.url && (
                  <ImgComponent
                    imageUrl={item.media_id.url}
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
              <div key={index} className=" mt-4 border rounded p-2">
                {/* <div className='w-full'> */}

                <MultiSelectorProductDropdown onSelectData={handleSelectedProductDataChange} />
                {/* </div> */}
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

export default MobileHome
