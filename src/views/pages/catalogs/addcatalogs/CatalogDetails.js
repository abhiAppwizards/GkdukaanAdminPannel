import React, { useState } from 'react'
import { CButton, CFormInput } from '@coreui/react'

function CatalogDetails() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }
  return (
    <>
      <h4 className="text-muted">Add Product Details</h4>
      <div className="mt-3">
        <h6 className="text-muted">Price,Size and inventory</h6>
        <div className="d-flex justify-content-between mb-3">
          <div className="d-inline-block ">
          <span style={{ display: 'block' }}>Price<span style={{ color: 'red' }}>*</span></span>
            <CFormInput style={{ width: "350px" }}  type="text" />
            {/* <span className="text-muted">Calculate your selling price</span> */}
          </div>
          <div className="d-inline-block">
            <span style={{ display: 'block' }}>MRP<span style={{ color: 'red' }}>*</span></span>
            <CFormInput style={{ width: "350px" }}  type="text" />
          </div>
          <div className="d-inline-block">
            <span style={{ display: 'block' }}>GST<span style={{ color: 'red' }}>*</span></span>
            <CFormInput style={{ width: "350px" }}  type="text" />
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-inline-block mb-3">
            <span style={{ display: 'block' }}>HSN Code<span style={{ color: 'red' }}>*</span></span>
            <CFormInput style={{ width: "350px" }} type="text" />
            {/* <span className="text-muted">Find relevent HSN code</span> */}
          </div>
          <div className="d-inline-block">
            <span style={{ display: 'block' }}>Product Weight<span style={{ color: 'red' }}>*</span></span>
            <CFormInput style={{ width: "350px" }} type="text" />
          </div>
          <div className="d-inline-block">
            <span style={{ display: 'block' }}>Product Name<span style={{ color: 'red' }}>*</span></span>
            <CFormInput style={{ width: "350px" }} type="text" />
          </div>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <div className="d-inline-block">
            <span style={{ display: 'block' }}>Description</span>
            <CFormInput style={{ width: "350px" }} type="text" />
          </div>
          <div className="d-inline-block">
            <span style={{ display: 'block' }}>Size<span style={{ color: 'red' }}>*</span></span>
            <CFormInput style={{ width: "350px" }} type="text" />
          </div>
          <div className="d-inline-block">
            <span style={{ display: 'block' }}>Product Name<span style={{ color: 'red' }}>*</span></span>
            <CFormInput style={{ width: "350px" }} type="text" />
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h6 className="text-muted">Product Details</h6>
        <div className="d-flex justify-content-between">
          <div className="d-inline-block mb-3">
            <span style={{ display: 'block' }}>Color<span style={{ color: 'red' }}>*</span></span>
            <CFormInput style={{ width: "350px" }} type="text" />
          </div>
          <div className="d-inline-block">
            <span style={{ display: 'block' }}>Material</span>
            <CFormInput style={{ width: "350px" }} type="text" />
          </div>
          <div className="d-inline-block">
            <span style={{ display: 'block' }}>Pattern<span style={{ color: 'red' }}>*</span></span>
            <CFormInput style={{ width: "350px" }} type="text" />
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-inline-block">
            <span style={{ display: 'block' }}>Sole Material<span style={{ color: 'red' }}>*</span></span>
            <CFormInput style={{ width: "350px" }} type="text" />
          </div>
          <div className="d-inline-block">
            <span style={{ display: 'block' }}>Type<span style={{ color: 'red' }}>*</span></span>
            <CFormInput style={{ width: "350px" }} type="text" />
          </div>
          <div className="d-inline-block">
            <span style={{ display: 'block' }}>Country Of Origin<span style={{ color: 'red' }}>*</span></span>
            <CFormInput style={{ width: "350px" }} type="text" />
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h6 className="text-muted">Other Attributes (optional)</h6>
        <div className="d-flex justify-content-between">
          <div className="d-inline-block">
            <span style={{ display: 'block' }}>Brand</span>
            <CFormInput style={{ width: "350px" }} type="text" />
          </div>
          <div className="d-inline-block">
            <span style={{ display: 'block' }}>Festenning & Back Detail</span>
            <CFormInput style={{ width: "350px" }} type="text" />
          </div>
          <div className="d-inline-block">
            <span style={{ display: 'block' }}>Ideal For</span>
            <CFormInput style={{ width: "350px" }} type="text" />
          </div>
        </div>
        <div className="d-flex justify-content-between mt-3">
          <div className="d-inline-block">
            <span style={{ display: 'block' }}>Multipack</span>
            <CFormInput style={{ width: "350px" }} type="text" />
          </div>
          <div className="d-inline-block">
            <span style={{ display: 'block' }}>Occasion</span>
            <CFormInput style={{ width: "350px" }} type="text" />
          </div>
          <div className="d-inline-block">
            <span style={{ display: 'block' }}>Ornamentation</span>
            <CFormInput style={{ width: "350px" }} type="text" />
          </div>
        </div>
      </div>
      <div className="my-5 text-center">
        {loading ? (
          <CButton onClick={handleSubmit} disabled>
            Submit
          </CButton>
        ) : (
          <CButton onClick={handleSubmit}>Submit</CButton>
        )}
      </div>
    </>
  )
}

export default CatalogDetails
