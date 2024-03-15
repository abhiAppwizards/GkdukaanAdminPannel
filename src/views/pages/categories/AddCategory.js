import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Form, Button } from 'react-bootstrap'
import Select from 'react-select'
import config from 'src/config'
import axios from 'axios'

function AddCategory() {
  // const [show, setShow] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    parentId: '',
  })
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const token = localStorage.getItem('adminToken')

  // const handleShow = () => {
  //   setShow(!show)
  // }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData((prevState) => ({
      ...prevState,
      image: file,
    }))
  }

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
      setCategories(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await axios.post(
        `${config.baseURL}/admin/categories`,
        {
          title: formData.title,
          description: formData.description,
          image: '65e06421688225912cd7ae04',
          path: formData.path,
          parentId: selectedCategory.value,
        },
        {
          headers: {
            authorization: token,
          },
        },
      )

      toast.success('Form submitted successfully')
      AllCategory()
      // Reset form fields after successful submission
      setFormData({
        title: '',
        description: '',
        image: '',
        parentId: '',
      })
    } catch (error) {
      toast.error('Failed to submit form')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  function flattenCategories(categories) {
    let options = [];
    categories.forEach(category => {
      options.push({
        value: category._id,
        label: category.title
      });
      if (category.children && category.children.length > 0) {
        options = options.concat(flattenChildren(category.children, 1));
      }
    });
    return options;
  }
  
  function flattenChildren(children, depth) {
    let options = [];
    children.forEach(child => {
      options.push({
        value: child._id,
        label: `${'--'.repeat(depth)} ${child.title}`
      });
      if (child.children && child.children.length > 0) {
        options = options.concat(flattenChildren(child.children, depth + 1));
      }
    });
    return options;
  }

  return (
    <>
      <div>
         <ToastContainer />
        {/*<div className="rounded bg-white p-3 shadow md:p-8 mb-8 flex flex-row items-center justify-between">
          <div className="md:w-1/4">
            <h2 className="relative text-lg font-semibold text-heading">Add Categories</h2>
          </div>
          <div>
            <Button className="text-blue-500" onClick={handleShow}>
              Add Category
            </Button>
          </div>
        </div> */}

        {/* {show && ( */}
          <div className="rounded p-4 shadow md:p-8 mb-8 bg-white justify-between">
            <div className="border w-full mt-4 p-2 rounded-md">
              <table className="table-auto">
                <tbody>
                  <tr>
                    <td className="font-semibold pl-2 pr-32">Title :</td>
                    <td className="pl-4">
                      <input
                        className="w-full lg:w-80 px-2 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold pl-2 pr-32">Description :</td>
                    <td className="pl-4">
                      <textarea
                        className="w-full lg:w-80 px-2 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold pl-2 pr-32">Upload Image :</td>
                    <td className="pl-4">
                      <input
                        className="w-full lg:w-80 px-2 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold pl-2 pr-32">Choose Parent :</td>
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
        {/* )} */}
      </div>
    </>
  )
}

export default AddCategory
