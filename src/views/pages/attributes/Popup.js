import React, { useState } from 'react'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import config from 'src/config'
import Select from 'react-select'

const PopupBox = ({ onClose, editingId, onCall, component }) => {
  const [title, setTitle] = useState()
  const [attributeData, setAttributeData] = useState(null)
  const [categoryData, setCategoryData] = useState(null)
  const [description, setDescription] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [categories, setCategories] = useState([])

  const token = localStorage.getItem('adminToken')

  const handleChange = (e) => {
    setTitle(e.target.value)
  }
  const handleDescription = (e) => {
    setDescription(e.target.value)
  }

  useEffect(()=>{
    AllCategory()
  },[])

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

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.baseURL}/admin/attributes/${editingId}`, {
        headers: {
          authorization: token,
        },
      })
      console.log('attributeData', response.data)
      setAttributeData(response.data)
      setTitle(response.data.name)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchCategoryData = async () => {
    try {
      const response = await axios.get(`${config.baseURL}/admin/categories/${editingId}`, {
        headers: {
          authorization: token,
        },
      })
      console.log('category',response.data)
      setCategoryData(response.data)
      setTitle(response.data.title)
      setDescription(response.data.description)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (component === 'attribute') {
      fetchData()
    } else {
      fetchCategoryData()
    }
  }, [])

  const handleSave = async () => {
    try {
      if (component === 'attribute') {
        let payload = {
          name: title,
          type: attributeData.type,
          values: attributeData.values,
          categories_id: attributeData.categories_id, 
        };
  
        if (selectedCategory) {
          payload.categories_id = selectedCategory.value;
        }
  
        const response = await axios.put(
          `${config.baseURL}/admin/attributes/${editingId}`,
          payload,
          {
            headers: {
              authorization: token,
            },
          }
        );
  
        console.log(response.data);
        onCall();
        onClose();
        setSelectedCategory('');
      } else {
        const response = await axios.put(
          `${config.baseURL}/admin/categories/${editingId}`,
          {
            title: title,
            description: description,
          },
          {
            headers: {
              authorization: token,
            },
          }
        );
        console.log(response.data);
        onCall();
        onClose();
        setSelectedCategory('');
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="fixed top-14 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-lg font-semibold mb-4">Edit Your Data...</h2>
        <div className="mb-4">
          <label className="block mb-1">Title</label>
          <input
            type="text"
            name="name"
            value={title}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        {categoryData && component === 'category' && (
          <>
            {categoryData && (
              <div className="mb-4">
                <label htmlFor="input2" className="block mb-1">
                  Selected Values
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={handleDescription}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
            )}
          </>
        )}
        {/* )} */}
        {attributeData && attributeData.type === 'select' && (
          <>
            {attributeData && (
              <div className="mb-4">
                <label htmlFor="input2" className="block mb-1">
                  Selected Values
                </label>
                <input
                  type="text"
                  value={attributeData.values.join(', ')}
                  onChange={(e) => {
                    const newValues = e.target.value.split(',').map((val) => val.trim())
                    setAttributeData({ ...attributeData, values: newValues })
                  }}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
            )}
          </>
        )}
        {attributeData && attributeData.type === 'text' && (
          <>
            <div className="mb-4">
              <label className="block mb-1">Attribute Type</label>
              <input
                type="text"
                value={attributeData.type || ''}
                onChange={(e) => {
                  setAttributeData({
                    ...attributeData,
                    type: e.target.value,
                  })
                }}
                className="w-full border rounded px-2 py-1"
              />
            </div>
          </>
        )}
        {attributeData && (
          <div className="d-inline-block mb-3">
            <span style={{ display: 'block' }}>
              Select Category<span style={{ color: 'red' }}>*</span>
            </span>
            <Select
              value={selectedCategory}
              onChange={setSelectedCategory}
              className="w-full lg:w-80 py-1 mt-2 focus:outline-blue-400"
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
        )}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

PopupBox.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCall: PropTypes.func.isRequired,
  editingId: PropTypes.string.isRequired,
  component: PropTypes.string.isRequired,
}

export default PopupBox
