import React, { useState } from 'react'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import config from 'src/config'

const PopupBox = ({ onClose, editingId, onCall, component }) => {
  const [title, setTitle] = useState()
  const [attributeData, setAttributeData] = useState(null)
  const [categoryData, setCategoryData] = useState(null)
  const [description, setDescription] = useState('')

  const token = localStorage.getItem('adminToken')

  const handleChange = (e) => {
    setTitle(e.target.value)
  }
  const handleDescription = (e) => {
    setDescription(e.target.value)
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.baseURL}/admin/attributes/${editingId}`, {
        headers: {
          authorization: token,
        },
      })
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
    {
      if (component === 'attribute') {
        try {
          const response = await axios.put(
            `${config.baseURL}/admin/attributes/${editingId}`,
            {
              name: title,
              type: attributeData.type,
              values: attributeData.values,
              categories_id: attributeData.categories_id,
            },
            {
              headers: {
                authorization: token,
              },
            },
          )
          onCall()
          onClose()
        } catch (error) {
          console.log(error)
        } finally {
          onClose()
        }
      } else {
        try {
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
            },
          )
          onCall()
          onClose()
        } catch (error) {
          console.log(error)
        } finally {
          onClose()
        }
      }
    }
  }

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
  editingId: PropTypes.number.isRequired,
  component: PropTypes.string.isRequired,
}

export default PopupBox
