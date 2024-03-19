import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Select from 'react-select'
import config from 'src/config'
import axios from 'axios'
import PropTypes from 'prop-types'
import ImgComponent from '../Home/ImgComponent'

function AddCategory({ onCall }) {
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')
  const [uploadedId,setUploadedId] = useState({})
  const token = localStorage.getItem('adminToken')

  useEffect(() => {
    AllCategory()
  }, [])

  const AllCategory = async () => {
    try {
      const response = await axios.get(`${config.baseURL}/admin/categories`, {
        headers: {
          authorization: token,
        },
      })
      // console.log('category',response)
      setCategories(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleFileUpload = (fileId) => {
    console.log('fileId',fileId)
    setUploadedId(fileId)
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const requestData = {
        title: title,
        description: description ? description : null,
        image: uploadedId,
        parentId: selectedCategory ? selectedCategory.value : null,
      }

      const response = await axios.post(`${config.baseURL}/admin/categories`, requestData, {
        headers: {
          authorization: token,
        },
      })
      setMessage('Form submitted successfully')
      onCall()
      AllCategory()
      setTitle('')
      setUploadedId('')
      setDescription('')
      setTimeout(() => {
        setMessage('')
      }, 1000)
    } catch (error) {
      setMessage('Failed to submit form')
      setTimeout(() => {
        setMessage('')
      }, 1000)
    } finally {
      setLoading(false)
    }
  }

  function flattenCategories(categories) {
    let options = []
    categories.forEach((category) => {
      options.push({
        value: category._id,
        label: category.title,
      })
      if (category.children && category.children.length > 0) {
        options = options.concat(flattenChildren(category.children, 1))
      }
    })
    return options
  }

  function flattenChildren(children, depth) {
    let options = []
    children.forEach((child) => {
      options.push({
        value: child._id,
        label: `${'--'.repeat(depth)} ${child.title}`,
      })
      if (child.children && child.children.length > 0) {
        options = options.concat(flattenChildren(child.children, depth + 1))
      }
    })
    return options
  }

  return (
    <>
      <div>
        <div className="rounded p-4 shadow md:p-8 mb-8 bg-white justify-between">
          {message && (
            <div
              className={
                message === 'Failed to submit form'
                  ? 'bg-red-500 border px-2 rounded-full text-white py-1'
                  : 'bg-green-500 border px-2 rounded-full text-white py-1'
              }
            >
              {message}
            </div>
          )}
          <div className="border w-full mt-4 p-2 rounded-md">
            <table className="table-auto">
              <tbody>
                <tr>
                  <td className="font-semibold pl-2 pr-32">Title :</td>
                  <td className="pl-4">
                    <input
                      className="w-full lg:w-80 px-2 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold pl-2 pr-32">Description :</td>
                  <td className="pl-4">
                    <textarea
                      className="w-full lg:w-80 px-2 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold pl-2 pr-32">Upload Image :</td>
                  <td className="pl-4">
                    {/* <input
                      className="w-full lg:w-80 px-2 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
                      type="file"
                      onChange={handleFileChange}
                    /> */}
                    <ImgComponent
                      onFileUpload={(fileId) => handleFileUpload(fileId)}
                      name="image1"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold pl-2 pr-32">Choose Category :</td>
                  <td className="pl-4">
                    <div className="mt-2">
                      <Select
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                        options={flattenCategories(categories)}
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
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button
            className={`border p-1 w-24 rounded-md mt-4 ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-slate-200 hover:bg-slate-100'
            } font-normal`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </>
  )
}
AddCategory.propTypes = {
  onCall: PropTypes.func.isRequired,
}

export default AddCategory
