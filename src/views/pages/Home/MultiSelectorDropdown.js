import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Multiselect from 'multiselect-react-dropdown'
import PropTypes from 'prop-types'
import useApi from 'src/api'

function MultiSelectorDropdown({ onSelectData, getHomeData }) {
  const [options, setOptions] = useState([])
  const [selectedIds, setSelectedIds] = useState([{}])
  const [getSelectedCat, setGetCatSelected] = useState([])

  const { fetchData, token } = useApi()

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchData(`/admin/categories`, 'get')
        const formattedOptions = formatOptions(res)
        setOptions(formattedOptions)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    getData()
  }, [token])

  useEffect(() => {
    const formattedOptions = formatOptions(getHomeData.categories_slider)
    setGetCatSelected(formattedOptions)
  }, [token])

  const formatOptions = (categories, level = 0) => {
    let options = []
    categories.forEach((category) => {
      options.push({
        id: category._id,
        name: `${'--'.repeat(level)} ${category.title}`,
      })
      if (category.children && category.children.length > 0) {
        options = options.concat(formatOptions(category.children, level + 1))
      }
    })
    return options
  }

  // Function to handle selection/deselection of options
  const handleSelect = (selectedList, selectedItem) => {
    setSelectedIds(selectedList.map((item) => item.id))
    onSelectData(selectedList.map((item) => item.id))
  }

  // Function to flatten the nested options structure
  const flattenOptions = (options) => {
    return options.reduce((acc, curr) => {
      acc.push(curr)
      if (curr.children && curr.children.length > 0) {
        acc.push(...flattenOptions(curr.children))
      }
      return acc
    }, [])
  }

  const handleRemove = (removedItem) => {
    setSelectedIds(removedItem.map((item) => item.id))
    onSelectData(removedItem.map((item) => item.id))
  }

  return (
    <React.Fragment>
      <Container className="content">
        <div className="row">
          <div className="col-sm-12">
            <form className="row g-3" method="post">
              <div className="col-md-5">
                <label className="form-label"> </label>
                <div className="text-dark">
                  <Multiselect
                    options={flattenOptions(options)}
                    displayValue="name"
                    showCheckbox
                    onSelect={handleSelect}
                    selectedValues={getSelectedCat}
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

MultiSelectorDropdown.propTypes = {
  onSelectData: PropTypes.func.isRequired,
  getHomeData: PropTypes.func.isRequired,
}

export default MultiSelectorDropdown
