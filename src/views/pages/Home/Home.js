import React, { useState } from 'react'
import ImgComponent from './ImgComponent'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import config from 'src/config'

function Home() {
  const [previews, setPreviews] = useState({
    preview1: null,
    preview2: null,
    preview3: null,
    preview4: null,
    preview5: null,
    preview6: null,
  })
  const [loading,setLoading] = useState(false)

  const handleChange = (event, index) => {
    const file = event.target.files[0]
    console.log('File selected:', file)
    setPreviews((prevState) => ({
      ...prevState,
      [`preview${index}`]: URL.createObjectURL(file),
    }))
  }

  const handleSubmit = async (event) => {
    setLoading(true)
    event.preventDefault()
    const formData = new FormData(event.target)

    const topSlider = []
    for (let i = 1; i <= 3; i++) {
      topSlider.push({
        image_url: previews[`preview${i}`],
        link: formData.get(`link${i}`),
      })
    }

    const topBanner = {
      image_url: previews.preview4,
      link: formData.get('link4'),
    }

    const categoriesSlider = [
      {
        category_name: formData.get('category_name1'),
        link: formData.get('link5'),
      },
      {
        category_name: formData.get('category_name2'),
        link: formData.get('link6'),
      },
      {
        category_name: formData.get('category_name3'),
        link: formData.get('link7'),
      },
    ]

    const secondBanner = {
      image_url: previews.preview5,
      link: formData.get('link8'),
    }
    const thirdBanner = {
      image_url: previews.preview6,
      link: formData.get('link9'),
    }

    const offerSection1 = [
      {
        product_id: formData.get('product_id1'),
        discount: formData.get('discount1'),
      },
    ]

    const offerSection2 = [
      {
        product_id: formData.get('product_id2'),
        discount: formData.get('discount2'),
      },
    ]

    const offerSection3 = [
      {
        product_id: formData.get('product_id3'),
        discount: formData.get('discount3'),
      },
    ]

    const postData = {
      top_slider: topSlider,
      top_banner: topBanner,
      categories_slider: categoriesSlider,
      second_banner: secondBanner,
      third_banner: thirdBanner, // Adding third_banner here
      offer_section1: offerSection1,
      offer_section2: offerSection2,
      third_banner: thirdBanner,
      offer_section3: offerSection3,
    }

    try {
      const response = await axios.post(`${config.baseURL}/admin/home`, postData)
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
    <ToastContainer/>
      <form onSubmit={handleSubmit}>
        <div className="rounded bg-white p-4 shadow md:p-8 mb-8 ">
          <h2 className=" relative text-lg font-semibold text-heading ">Top Slider Section</h2>
          <div className="mt-8 flex justify-evenly items-center">
            <h1 className="font-semibold">Image 1</h1>
            <ImgComponent
              preview={previews.preview1}
              onChange={(e) => handleChange(e, 1)}
              name="image1"
            />
            <input
              name="link1"
              placeholder='Your Link'
              className="border-2 border-gray-400 outline-none  w-96 h-10 rounded-md px-2"
            />
          </div>
          <div className="mt-8 flex justify-evenly items-center">
            <h1 className="font-semibold">Image 2</h1>
            <ImgComponent
              preview={previews.preview2}
              onChange={(e) => handleChange(e, 2)}
              name="image2"
            />
            <input
              name="link2"
              placeholder='Your Link'
              className="border-2 border-gray-400 outline-none  w-96 h-10 rounded-md px-2"
            />
          </div>
          <div className="mt-8 flex justify-evenly items-center">
            <h1 className="font-semibold">Image 3</h1>
            <ImgComponent
              preview={previews.preview3}
              onChange={(e) => handleChange(e, 3)}
              name="image3"
            />
            <input
              name="link3"
              placeholder='Your Link'
              className="border-2 border-gray-400 outline-none  w-96 h-10 rounded-md px-2"
            />
          </div>
        </div>
        {/* Top  banner */}
        <div className="rounded bg-white p-4 shadow md:p-8 mb-8 ">
          <h2 className=" relative text-lg font-semibold text-heading ">Top Banner</h2>
          <div className="mt-8 flex justify-evenly items-center">
            <h1 className="font-semibold">Image 1</h1>
            <ImgComponent
              preview={previews.preview4}
              onChange={(e) => handleChange(e, 4)}
              name="image4"
            />
            <input
              name="link4"
              placeholder='Top Banner Link'
              className="border-2 border-gray-400 outline-none  w-96 h-10 rounded-md px-2"
            />
          </div>
        </div>
        {/* Catagories Slider */}
        <div className="rounded bg-white p-4 shadow md:p-8 mb-8 ">
          <h2 className=" relative text-lg font-semibold text-heading ">
            Categories Slider Section
          </h2>
          <div className="mt-8 flex justify-evenly items-center">
            <h1 className="font-semibold">Category 1</h1>
            <input
              name="category_name1"
              placeholder='Category Name'
              className="border-2 border-gray-400 outline-none  w-40 h-10 rounded-md px-2"
            />
            <input
              name="link5"
              placeholder='Category Link'
              className="border-2 border-gray-400 outline-none  w-40 h-10 rounded-md px-2"
            />
          </div>
          <div className="mt-8 flex justify-evenly items-center">
            <h1 className="font-semibold">Category 2</h1>
            <input
              name="category_name2"
              placeholder='Category Name'
              className="border-2 border-gray-400 outline-none  w-40 h-10 rounded-md px-2"
            />
            <input
              name="link6"
              placeholder='Category Link'
              className="border-2 border-gray-400 outline-none  w-40 h-10 rounded-md px-2"
            />
          </div>
          <div className="mt-8 flex justify-evenly items-center">
            <h1 className="font-semibold">Category 3</h1>
            <input
              name="category_name3"
              placeholder='Category Name'
              className="border-2 border-gray-400 outline-none  w-40 h-10 rounded-md px-2"
            />
            <input
              name="link7"
              placeholder='Category Link'
              className="border-2 border-gray-400 outline-none  w-40 h-10 rounded-md px-2"
            />
          </div>
        </div>
        {/* Second  banner */}
        <div className="rounded bg-white p-4 shadow md:p-8 mb-8 ">
          <h2 className=" relative text-lg font-semibold text-heading ">Second Banner</h2>
          <div className="mt-8 flex justify-evenly items-center">
            <h1 className="font-semibold">Image 1</h1>
            <ImgComponent
              preview={previews.preview5}
              onChange={(e) => handleChange(e, 5)}
              name="image5"
            />
            <input
              name="link8"
              placeholder='Second Banner Link'
              className="border-2 border-gray-400 outline-none  w-96 h-10 rounded-md px-2"
            />
          </div>
        </div>
        {/* Third  banner */}
        <div className="rounded bg-white p-4 shadow md:p-8 mb-8 ">
          <h2 className=" relative text-lg font-semibold text-heading ">Thirt Banner</h2>
          <div className="mt-8 flex justify-evenly items-center">
            <h1 className="font-semibold">Image 1</h1>
            <ImgComponent
              preview={previews.preview6}
              onChange={(e) => handleChange(e, 6)}
              name="image6"
            />
            <input
              name="link9"
              placeholder='Third Banner Link'
              className="border-2 border-gray-400 outline-none  w-96 h-10 rounded-md px-2"
            />
          </div>
        </div>
        {/* Offer Section */}
        <div className="rounded bg-white p-4 shadow md:p-8 mb-8 ">
          <h2 className=" relative text-lg font-semibold text-heading ">Offer Sections</h2>
          <div className="flex justify-around mt-4">
            <div>
              <h1 className="font-semibold">Offer Section 1</h1>
              <div>
                <input
                  name="product_id1"
                  placeholder="Product ID"
                  className="border-2 px-2 border-gray-400 outline-none  w-80 mt-2 h-10 rounded-md"
                />
                <input
                  name="discount1"
                  placeholder="Discount"
                  className="border-2 px-2 border-gray-400 outline-none  w-80 mt-2 h-10 rounded-md"
                />
              </div>
            </div>
            <div>
              <h1 className="font-semibold">Offer Section 2</h1>
              <div>
                <input
                  name="product_id2"
                  placeholder="Product ID"
                  className="border-2 px-2 border-gray-400 outline-none  w-80 mt-2 h-10 rounded-md"
                />
                <input
                  name="discount2"
                  placeholder="Discount"
                  className="border-2 px-2 border-gray-400 outline-none  w-80 mt-2 h-10 rounded-md"
                />
              </div>
            </div>
            <div>
              <h1 className="font-semibold">Offer Section 3</h1>
              <div>
                <input
                  name="product_id3"
                  placeholder="Product ID"
                  className="border-2 px-2 border-gray-400 outline-none  w-80 mt-2 h-10 rounded-md"
                />
                <input
                  name="discount3"
                  placeholder="Discount"
                  className="border-2 px-2 border-gray-400 outline-none  w-80 mt-2 h-10 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="border px-4 py-2 mb-5 rounded bg-green-400 text-white hover:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Submiting..." : "Submit"}
        </button>
      </form>
    </>
  )
}

export default Home
