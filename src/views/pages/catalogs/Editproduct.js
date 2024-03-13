// VendorProductList.js
import React, { useEffect, useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
} from '@coreui/react';

const VendorProductList = ({ }) => {
  const [products, setProducts] = useState([]);
  const [vendorId] = useState("65b8831c688c1f86adf4ed19")
  useEffect(() => {
    // Fetch products for the vendor based on vendorId from the route params
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/vendors/${vendorId}/products`, {
          credentials: 'include'
        });
        const data = await response.json();
        console.log(data)
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [vendorId]);

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <strong>Product List</strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped hover responsive>
              <thead>
                <tr>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                  {/* Add more columns as needed */}
                </tr>
              </thead>
              <CTableBody>
                {products.map((product, index) => (
                  <CTableRow key={product._id}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{product.name}</CTableDataCell>
                    <CTableDataCell>{product.description}</CTableDataCell>
                    <CTableDataCell>${product.price}</CTableDataCell>
                    {/* Add more cells as needed */}
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default VendorProductList;
