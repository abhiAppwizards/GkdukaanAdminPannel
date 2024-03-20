import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import Select from 'react-select'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { CSpinner } from '@coreui/react'
import { useNavigate } from 'react-router-dom'

const options = [
  {
    label: 'Category 1',
    subcategories: [
      {
        label: 'Subcategory 1.1',
        subsubcategories: [
          {
            label: 'Sub-subcategory 1.1.1',
            options: [
              { value: 'action', label: 'Action' },
              { value: 'another-action', label: 'ss action' },
            ],
          },
          {
            label: 'Sub-subcategory 1.1.2',
            options: [{ value: 'something-else', label: 'Something else here' }],
          },
        ],
      },
    ],
  },
  {
    label: 'Category 2',
    subcategories: [
      {
        label: 'Subcategory 2.1',
        subsubcategories: [
          {
            label: 'Sub-subcategory 2.1.1',
            options: [
              { value: 'option-1', label: 'Option 1' },
              { value: 'option-2', label: 'Option 2' },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Category 3',
    subcategories: [
      {
        label: 'Subcategory 3.1',
        subsubcategories: [
          {
            label: 'Sub-subcategory 3.1.1',
            options: [
              { value: 'foo', label: 'Foo' },
              { value: 'bar', label: 'Bar' },
              { value: 'baz', label: 'Baz' },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Category 4',
    subcategories: [
      {
        label: 'Subcategory 4.1',
        subsubcategories: [
          {
            label: 'Sub-subcategory 4.1.1',
            options: [
              { value: 'apple', label: 'Apple' },
              { value: 'banana', label: 'Banana' },
            ],
          },
        ],
      },
    ],
  },
]

function AddBulkProducts() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  //image set code
  const [images, setImages] = useState([])
  const handleFileUpload = (e) => {
    const uploadedImages = Array.from(e.target.files)
    setImages((prevImages) => [...prevImages, ...uploadedImages])
  }

  const handleImageDelete = (index) => {
    setImages((prevImages) => prevImages.filter((image, i) => i !== index))
  }
  /****************** //image set code end***************** */

  const [selectedValues, setSelectedValues] = useState({
    category: null,
    subcategory: null,
    subsubcategory: null,
  })

  const [copiedUrl, setCopiedUrl] = useState(null)

  // Function to copy URL to clipboard
  const handleCopyUrl = (url) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopiedUrl(url)
        setTimeout(() => {
          setCopiedUrl(null)
        }, 2000) // Reset copiedUrl after 2 seconds
      })
      .catch((error) => {
        console.error('Failed to copy:', error)
      })
  }

  const handleCategoryChange = (selectedOption) => {
    setSelectedValues({
      category: selectedOption,
      subcategory: null,
      subsubcategory: null,
    })
  }

  const handleSubcategoryChange = (selectedOption) => {
    setSelectedValues({
      ...selectedValues,
      subcategory: selectedOption,
      subsubcategory: null,
    })
  }

  const handleSubsubcategoryChange = (selectedOption) => {
    setSelectedValues({
      ...selectedValues,
      subsubcategory: selectedOption,
    })
  }

  const handleSubmit = () => {
    const { category, subcategory, subsubcategory } = selectedValues
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      //    navigate('/catalogs/add/single/catalog')
    }, 3000)
  }


  return (
    <Container>
      <Row>
        <Col>
          {/* <Form> */}
          <Form.Group>
            <Form.Label>Select a category:</Form.Label>
            <Select
              value={selectedValues.category}
              onChange={handleCategoryChange}
              options={options}
              isSearchable
              placeholder="Search..."
            />
            {selectedValues.category && selectedValues.category.subcategories && (
              <>
                <Form.Label>Select a subcategory:</Form.Label>
                <Select
                  value={selectedValues.subcategory}
                  onChange={handleSubcategoryChange}
                  options={selectedValues.category.subcategories}
                  isSearchable
                  placeholder="Search..."
                />
              </>
            )}
            {selectedValues.subcategory && selectedValues.subcategory.subsubcategories && (
              <>
                <Form.Label>Select a sub-subcategory:</Form.Label>
                <Select
                  value={selectedValues.subsubcategory}
                  onChange={handleSubsubcategoryChange}
                  options={selectedValues.subcategory.subsubcategories}
                  isSearchable
                  placeholder="Search..."
                />
              </>
            )}
            {/* Image */}
            {selectedValues.subsubcategory && (
              <div className="file-upload mt-3 d-flex justify-content-center axlign-items-center">
                <Container>
                  <Row className="justify-content-start">
                    <Col md={8}>
                      <Form.Label className="text-center mb-3">Upload Images:</Form.Label>
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
                          <Row>
                            {/* Render images */}
                            {images.map((image, index) => (
                              <Col key={index} md={3} sm={6} className="mb-3">
                                <div className="position-relative">
                                  <button
                                    className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1"
                                    onClick={() => handleImageDelete(index)}
                                  >
                                    <FontAwesomeIcon icon={faTimesCircle} />
                                  </button>
                                  <div className="ratio ratio-1x1">
                                    <img
                                      src={URL.createObjectURL(image)}
                                      alt={`Uploaded ${index}`}
                                      className="img-fluid"
                                    />
                                  </div>
                                </div>
                              </Col>
                            ))}
                          </Row>
                          {/* Display URLs */}
                          <Row>
                            <Col>
                              {images.map((image, index) => (
                                <div key={index} className="mb-3">
                                  <div className="card text-center" style={{ width: '100%', height: '50px' }}>
                                    <div className="card-body">
                                      <div className="position-relative">
                                        <div className="card-text font-weight-bold">
                                          URL: {URL.createObjectURL(image)}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            )}
            {loading ? (
              <div className="mt-5">
                <Button onClick={handleSubmit} disabled>
                  Submit
                </Button>{' '}
                {/* <CSpinner className="mt-5" type="border" color="primary" /> */}
              </div>
            ) : (
              <div className="mt-5">
                <Button onClick={handleSubmit}>Submit</Button>
              </div>
            )}
          </Form.Group>
          {/* </Form> */}
        </Col>
      </Row>
    </Container>
  )
}

export default AddBulkProducts
