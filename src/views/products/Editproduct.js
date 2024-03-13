import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCol,
  CRow,
} from '@coreui/react'
import config from 'src/config'
import { useNavigate, useParams } from 'react-router-dom'
import { CFormInput } from '@coreui/react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'

const EditProduct = () => {
  const [product, setProduct] = useState({
    name:'',
    description:'',
    in_stock:'',
    mrp:'',
    sku:'',
    weight:'',
  })
  const token = localStorage.getItem('vendorToken')
  const params = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const [mrp, setMrp] = useState()
  const [status, setStatus] = useState()
  const [advertisingStatus, setAdvertisingStatus] = useState()
  const [loading, setLoading] = useState()

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await axios.put(
        `${config.baseURL}/vendor/product/catalog/${params.id}`,
        product,
        {
          headers: {
            authorization: token,
          },
        },
      )
      console.log(response.data)
      setLoading(false)
      navigate('/products/all')
    } catch (error) {
      console.error('Error while adding product:', error)
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${config.baseURL}/vendor/product/${params.id}`, {
          headers: {
            authorization: token,
          },
        })
        const data = await response.json()
        // console.log('fetchProducts',data)
        setProduct(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    if (params.id) {
      fetchProducts()
    }
  }, [params.id])

  return (
    <CRow>
      <CCol>
        <CCard className="p-4">
          <Form.Group key="product._id">
            <div className="mt-7">
              <div className="d-flex justify-content-between">
                <div className="d-inline-block mb-3">
                  <span style={{ display: 'block' }}>
                    Name<span style={{ color: 'red' }}>*</span>
                  </span>
                  <input
                    className="w-full lg:w-80 px-2 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
                    value={product.name}
                    onChange={handleChange}
                    name='name'
                    style={{ width: '350px' }}
                    type="text"
                  />
                </div>
                <div className="d-inline-block">
                  <span style={{ display: 'block' }}>
                    description
                  </span>
                  <input
                    className="w-full lg:w-80 px-2 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
                    onChange={handleChange}
                    style={{ width: '350px' }}
                    name='description'
                    value={product.description}
                    type="text"
                  />
                </div>
                <div className="d-inline-block">
                  <span style={{ display: 'block' }}>
                    Vendor Id
                  </span>
                  <input className="w-full lg:w-80 px-2 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400" value={product.vendor_id} name='vendor_id' style={{ width: '350px' }} type="text" />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-inline-block mb-3">
                  <span style={{ display: 'block' }}>
                    MRP
                  </span>
                  <input
                    className="w-full lg:w-80 px-2 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
                    onChange={handleChange}
                    style={{ width: '350px' }}
                    name='mrp'
                    value={product.mrp}
                    type="text"
                  />
                </div>
                <div className="d-inline-block">
                  <span style={{ display: 'block' }}>
                    Stock
                  </span>
                  <input
                    className="w-full lg:w-80 px-2 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
                    onChange={handleChange}
                    style={{ width: '350px' }}
                    name='in_stock'
                    value={product.in_stock}
                    // disabled
                    type="text"
                  />
                </div>
                <div className="d-inline-block">
                  <span style={{ display: 'block' }}>
                    Quantity
                  </span>
                  <input
                    className="w-full lg:w-80 px-2 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
                    onChange={handleChange}
                    style={{ width: '350px' }}
                    name='sku'
                    value={product.sku}
                    // disabled
                    type="text"
                  />
                </div>
              </div>
                <div className="d-inline-block">
                  <span style={{ display: 'block' }}>
                    Product Weight
                  </span>
                  <input
                    className="w-full lg:w-80 px-2 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
                    onChange={handleChange}
                    style={{ width: '350px' }}
                    name='weight'
                    value={product.weight}
                    // disabled
                    type="text"
                  />
                </div>
            </div>
            {loading ? (
              <div className="mt-5">
                <Button onClick={handleSubmit} disabled>
                  Submit
                </Button>{' '}
                {/* <CSpinner className="mt-5" type="border" color="primary" /> */}
              </div>
            ) : (
              <div className="mt-5">
                <Button className="text-blue-500" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            )}
          </Form.Group>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EditProduct
