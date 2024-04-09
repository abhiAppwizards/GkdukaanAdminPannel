import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Multiselect from 'multiselect-react-dropdown'
import PropTypes from 'prop-types'
import useApi from 'src/api'

function MultiSelectorProductDropdown({ onSelectData, products,index }) {
  const [options, setOptions] = useState([])
  const [selectedIds, setSelectedIds] = useState([])
  const [topProducts, setTopProducts] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])

  // console.log('products..... ', products)
  const { loading, error, fetchData, token } = useApi()

  useEffect(() => {
    if (products?.length > 0) {
      let newProducts = products.map(product => ({
        name: product.name,
        _id: product._id,
      }))
      setSelectedProducts(newProducts)
    }
  }, [products])

  useEffect(() => {
    if (token) {
      const getData = async () => {
        try {
          const res = await fetchData('/admin/product', 'get')
          if (Array.isArray(res)) {
            const productNames = res.map((product) => ({
              name: product.name || '',
              id: product._id,
            }))
            setOptions(productNames)
          } else {
            console.error('Error: Data received is not an array')
          }
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
      getData()
    }
  }, [token])

  const handleSelect = (selectedList, selectedItem) => {
    onSelectData(selectedList, index)
  }

  const handleRemove = (idToRemove) => {
    const updatedSelectedProducts = idToRemove
    setSelectedProducts(updatedSelectedProducts)
    onSelectData(updatedSelectedProducts, index)
  }

  return (
    <React.Fragment>
      <Container className="content">
        <div className="row">
          <div className="col-sm-12">
            <form className="row g-3" method="post">
              <div className="col-md-12">
                <label className="form-label"> </label>
                <div className="text-dark">
                  <Multiselect
                    options={options}
                    displayValue="name"
                    showCheckbox
                    onSelect={handleSelect}
                    selectedValues={selectedProducts}
                    onRemove={handleRemove}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </React.Fragment>
  )
}

MultiSelectorProductDropdown.propTypes = {
  onSelectData: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
}

export default MultiSelectorProductDropdown
