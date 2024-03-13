import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const AddCatalog = () => {
  return (
    <>
      <div>
        <div className="d-flex gap-5 mb-5">
          <div className=" mb-5">
            <div>
              <h6 className="text-muted mb-4">
                Have unique Products to sell? Choose from the options below
              </h6>
            </div>
            <div className="d-flex gap-5">
              <Link to="/products/add/single">
                <button type="button" className="btn btn-outline-danger">
                  Add Catalogs in Single
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddCatalog;
