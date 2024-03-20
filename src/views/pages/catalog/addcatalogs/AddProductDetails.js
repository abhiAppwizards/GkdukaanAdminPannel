import React, { useState } from 'react'
import { CButton } from '@coreui/react'
import DropDown from '../productComponent/Dropdown'
import axios from 'axios'
import config from 'src/config'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function AddProductDetails() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [variantForms, setVariantForms] = useState([
    {
      productName: '',
      description: '',
      productWeight: '',
      mrp: '',
      sku: '',
      status: '',
      stock: '',
    },
  ])
  const { id } = useParams()
  const token = localStorage.getItem('vendorToken')

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await axios.post(
        `${config.baseURL}/vendor/product/catalog/${id}`,
        {
          products: variantForms.map((variant) => ({
            name: variant.productName,
            description: variant.description,
            catalog_id: id,
            weight: variant.productWeight,
            sku: variant.sku,
            images: ['image_url1', 'image_url2'],
            valid: true,
            mrp: variant.mrp,
            stamps: {
              cod: true,
              return: false,
              logo: true,
            },
            in_stock: variant.stock,
            status: variant.status,
            media_id: '65df23d03c433f3792d3455c',
          })),
        },
        {
          headers: {
            authorization: token,
          },
        },
      )
      if(response.status === 201){
        navigate('/catalogs/all')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
    setLoading(false)
  }

  const handleAddVariant = () => {
    setVariantForms([
      ...variantForms,
      {
        productName: '',
        description: '',
        productWeight: '',
        mrp: '',
        sku: '',
        status: '',
        stock: '',
      },
    ])
  }

  const handleChange = (index, key, value) => {
    const updatedForms = [...variantForms]
    updatedForms[index][key] = value
    setVariantForms(updatedForms)
  }

  const options = [
    {
      _id: 'true',
      title: 'true',
    },
    {
      _id: 'false',
      title: 'false',
    },
  ]

  return (
    <>
    <ToastContainer />
      <h4 className="text-muted">Add Product Details</h4>
      {variantForms.map((variant, index) => (
        <div key={index}>
          <form>
            <div className="mt-3">
              <div className="d-flex justify-content-between mb-3">
                <div className="d-inline-block ">
                  <span style={{ display: 'block' }}>
                    Product Name<span style={{ color: 'red' }}>*</span>
                  </span>
                  <input
                    className="w-full lg:w-80 px-3 py-2 border border-gray-300 rounded focus:outline-blue-400"
                    type="text"
                    value={variant.productName}
                    onChange={(e) => handleChange(index, 'productName', e.target.value)}
                  />
                </div>
                <div className="d-inline-block">
                  <span style={{ display: 'block' }}>
                    Description<span style={{ color: 'red' }}>*</span>
                  </span>
                  <input
                    className="w-full lg:w-80 px-3 py-2 border border-gray-300 rounded focus:outline-blue-400"
                    type="text"
                    value={variant.description}
                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                  />
                </div>
                <div className="d-inline-block">
                  <span style={{ display: 'block' }}>
                    Product Weight<span style={{ color: 'red' }}>*</span>
                  </span>
                  <input
                    className="w-full lg:w-80 px-3 py-2 border border-gray-300 rounded focus:outline-blue-400"
                    type="text"
                    value={variant.productWeight}
                    onChange={(e) => handleChange(index, 'productWeight', e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-inline-block mb-3">
                  <span style={{ display: 'block' }}>
                    Mrp<span style={{ color: 'red' }}>*</span>
                  </span>
                  <input
                    className="w-full lg:w-80 px-3 py-2 border border-gray-300 rounded focus:outline-blue-400"
                    type="text"
                    value={variant.mrp}
                    onChange={(e) => handleChange(index, 'mrp', e.target.value)}
                  />
                </div>
                <div className="w-full lg:w-80 rounded focus:outline-blue-400">
                  <DropDown
                    label={'Select Stock'}
                    optionsData={options}
                    value={variant.stock}
                    onChange={(value) => handleChange(index, 'stock', value)}
                  />
                </div>
                <div className="d-inline-block">
                  <span style={{ display: 'block' }}>
                    Stock-keeping unit<span style={{ color: 'red' }}>*</span>
                  </span>
                  <input
                    className="w-full lg:w-80 px-3 py-2 border border-gray-300 rounded focus:outline-blue-400"
                    type="text"
                    value={variant.sku}
                    onChange={(e) => handleChange(index, 'sku', e.target.value)}
                  />
                </div>
              </div>
            </div>
            <DropDown
              label={'Select Status'}
              optionsData={options}
              value={variant.status}
              onChange={(value) => handleChange(index, 'status', value)}
            />
          </form>
          <hr className="my-4 border-t-2 border-dashed" />
        </div>
      ))}
      <div className="flex my-5 justify-between">
        <div>
          <CButton className="text-blue-800" onClick={handleAddVariant}>
            Add Variant
          </CButton>
        </div>
        <div className=" text-center">
          {loading ? (
            <CButton onClick={handleSubmit} disabled>
              Submit
            </CButton>
          ) : (
            <CButton className="text-blue-800" onClick={handleSubmit}>
              Submit
            </CButton>
          )}
        </div>
      </div>
    </>
  )
}

export default AddProductDetails
