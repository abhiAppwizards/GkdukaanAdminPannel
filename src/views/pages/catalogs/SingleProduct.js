import React, { useState } from 'react';

const Addcatalog = () => {
  const [vendorId] = useState('65b8831c688c1f86adf4ed19');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = createFormData(e.target);
      console.log('Form Data:', Object.fromEntries(formData));

      // Uncomment this block to submit the form data to the API
      // const response = await axios.post(`http://localhost:3000/vendors/${vendorId}/products`, formData, {
      //   withCredentials: true,
      //   headers: {
      //     'Content-Type': 'multipart/form-data', 
      //   },
      // });
      // console.log('Product created:', response.data);
      
      e.target.reset();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const createFormData = (target) => {
    const formData = new FormData();
    formData.append('product_name', target.product_name.value);
    formData.append('product_type', target.product_type.value);
    formData.append('product_price', target.product_price.value);
    formData.append('product_image', target.product_image.files[0]);
    formData.append('address', target.address.value);
    return formData;
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-1">
          <label htmlFor="product_name" className="form-label">
            Product Name
          </label>
          <input type="text" className="form-control" id="product_name" name="product_name" />
        </div>
        <div className="mb-1">
          <label htmlFor="product_type" className="form-label">
            Product Type
          </label>
          <input type="text" className="form-control" id="product_type" name="product_type" />
        </div>
        <div className="mb-1">
          <label htmlFor="product_price" className="form-label">
            Product Price
          </label>
          <input type="text" className="form-control" id="product_price" name="product_price" />
        </div>
        <div className="mb-1">
          <label htmlFor="product_image" className="form-label">
            Product Image
          </label>
          <input type="file" className="form-control" id="product_image" name="product_image" />
        </div>
        <div className="mb-1">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input type="text" className="form-control" id="address" name="address" />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Addcatalog;
