import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import Select from 'react-select'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import DropDown from '../productComponent/Dropdown'
import config from 'src/config'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { ProductAction } from 'src/redux/Action'

function AddSingleCatalog() {
  const [levelOneCategory, setLevelOneCategory] = useState('')
  const [levelTwoCategory, setLevelTwoCategory] = useState('')
  const [levelThreeCategory, setLevelThreeCategory] = useState('')
  const [levelFourCategory, setLevelFourCategory] = useState('')
  const [allCategories, setAllCategories] = useState([])
  const [subCategoriesState, setSubCategoriesState] = useState([])
  const [subsubcategories, setSubsubcategories] = useState([])
  const [subsubsubcategories, setSubsubsubcategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [catalog, setCatalog] = useState({})
  const token = localStorage.getItem('vendorToken')

  useEffect(() => {
    Categories()
  }, [])

  const Categories = async () => {
    try {
      const response = await axios.get(`${config.baseURL}/admin/categories`, {
        headers: {
          authorization: token,
        },
      })
      setAllCategories(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post(
        `${config.baseURL}/vendor/catalog`,
        { name: title, 
          full_details: description, 
          categories_id: levelFourCategory 
        },
        {
          headers: {
            authorization: token,
          },
        },
      )
      console.log(response)
      dispatch(ProductAction(response.data))
      toast.success('Catalog added successfully')
      if (response.status === 201) {
        navigate(`/products/add/single/catalog/${response.data._id}`)
      }
    } catch (error) {
      toast.error('Failed to add Catelogue')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = (e) => {
    const uploadedImages = Array.from(e.target.files)
    setImages((prevImages) => [...prevImages, ...uploadedImages])
  }

  const handleImageDelete = (index) => {
    setImages((prevImages) => prevImages.filter((image, i) => i !== index))
  }

  //category selection code....

  const handleCategoryChange = (category) => {
    const subcategories = allCategories.filter((val) => val._id === category)
    setLevelOneCategory(category)
    setLevelTwoCategory('')
    setLevelThreeCategory('')
    setSubCategoriesState(subcategories[0].children)
  }

  const handleSubcategoryChange = (subcategory) => {
    const subCategories = subCategoriesState.filter((val) => val._id === subcategory)
    setLevelTwoCategory(subcategory)
    setLevelThreeCategory('')
    setSubsubcategories(subCategories[0].children)
  }

  const handleSubsubcategoryChange = (subsubcategory) => {
    const subCategories = subsubcategories.filter((val) => val._id === subsubcategory)
    // console.log('subCategories......',subCategories)
    setLevelThreeCategory(subsubcategory)
    setSubsubsubcategories(subCategories[0].children)
  }

  const handleSubsubsubcategoryChange = (subsubsubcategory) => {
    const subCategories = subsubsubcategories.filter((val) => val._id === subsubsubcategory)
    setLevelFourCategory(subsubsubcategory)
    // console.log('setLevelFourCategory',subCategories[0])
  }

  return (
    <Container>
      <ToastContainer />
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className="from-neutral-800 text-3xl px-3">Add Catalog :</Form.Label>
              <div className="mt-4">
              <DropDown
                label={'Select Level one Id'}
                optionsData={allCategories}
                value={levelOneCategory}
                onChange={handleCategoryChange}
              />
              </div>
              <div className="mt-2">
                {levelOneCategory && (
                  <DropDown
                    label={'Select Level Two Id'}
                    optionsData={subCategoriesState}
                    value={levelTwoCategory}
                    onChange={handleSubcategoryChange}
                  />
                )}
              </div>
              <div className="mt-2">
                {levelTwoCategory && (
                  <DropDown
                    label={'Select Level Three Id'}
                    optionsData={subsubcategories}
                    value={levelThreeCategory}
                    onChange={handleSubsubcategoryChange}
                  />
                )}
                <div className="mt-2">
                  {levelThreeCategory && (
                    <DropDown
                      label={'Select Level Four Id'}
                      optionsData={subsubsubcategories}
                      value={levelFourCategory}
                      onChange={handleSubsubsubcategoryChange}
                    />
                  )}
                </div>
              </div>
              {/* Image */}
              {levelFourCategory && (
                <div className="file-upload mt-3 d-flex justify-start">
                  <Container>
                    <Row className="justify-content-center">
                      <Col md={8}>
                        <Form.Label className="text-center mb-3">Upload a file:</Form.Label>
                        <div className="input-group">
                          <div className="border p-3 ">
                            <div className="text-center">
                              <FontAwesomeIcon icon={faCloudUploadAlt} size="4x" />
                            </div>
                            <div className="text-center my-3">
                              <label htmlFor="file-upload" className="btn btn-primary">
                                Choose File
                              </label>
                              <input
                                id="file-upload"
                                type="file"
                                multiple
                                onChange={handleFileUpload}
                                style={{ display: 'none' }}
                              />
                            </div>
                            {images.length > 0 && (
                              <div>
                                <h5 className="text-center">Uploaded Images:</h5>
                                <Row>
                                  {images.map((image, index) => (
                                    <Col key={index} md={3} sm={6} className="mb-3">
                                      <div className="position-relative">
                                        <button
                                          className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1"
                                          onClick={() => handleImageDelete(index)}
                                        >
                                          <FontAwesomeIcon icon={faTimesCircle} />
                                        </button>
                                        <img
                                          src={URL.createObjectURL(image)}
                                          alt={`Uploaded ${index}`}
                                          className="img-fluid"
                                        />
                                      </div>
                                    </Col>
                                  ))}
                                </Row>
                              </div>
                            )}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
              )}
              <div className="mt-7 px-2">
                <div className="flex flex-col lg:flex-row lg:justify-between">
                  <div className="mb-3 lg:mr-3">
                    <label className="block">
                      <span className="block">
                        Title<span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full lg:w-80 px-3 py-2 border border-gray-300 rounded focus:outline-blue-400"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="block">
                      <span className="block">
                        Description<span className="text-red-500">*</span>
                      </span>
                    </label>
                    <textarea
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full lg:w-80 px-3 py-2 border border-gray-300 rounded focus:outline-blue-400"
                      rows="4"
                    ></textarea>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="mt-5">
                  <Button disabled type="submit">
                    Submit
                  </Button>{' '}
                  {/* <CSpinner className="mt-5" type="border" color="primary" /> */}
                </div>
              ) : (
                <div className="mt-5">
                  <Button type="submit" className="text-blue-500">
                    Submit
                  </Button>
                </div>
              )}
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default AddSingleCatalog
