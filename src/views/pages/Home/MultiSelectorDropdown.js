import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Multiselect from 'multiselect-react-dropdown';
import PropTypes from 'prop-types'; 
import useApi from 'src/api';

function MultiSelectorDropdown({ onSelectData }) {
  const [options, setOptions] = useState([]);
  const [selectedIds, setSelectedIds] = useState([{}]);

  const { loading, error, fetchData, token } = useApi();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchData(`/admin/categories`,'get');
        const formattedOptions = formatOptions(res);
        setOptions(formattedOptions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, [token]); 

  // Function to recursively format options
  const formatOptions = (categories, level = 0) => {
    return categories.map(category => {
      const option = {
        name: `${'\xA0'.repeat(level * 4)}${category.title}`, // Using non-breaking space for indentation
        id: category._id,
        children: []
      };

      if (category.children && category.children.length > 0) {
        // If category has children, recursively format them with increased level of indentation
        option.children = formatOptions(category.children, level + 1);
      }

      return option;
    });
  };

  // Function to handle selection/deselection of options
  const handleSelect = (selectedList, selectedItem) => {
    setSelectedIds(selectedList.map(item => item.id));
    onSelectData(selectedList.map(item => item.id)); 
  };

  // Function to flatten the nested options structure
  const flattenOptions = options => {
    return options.reduce((acc, curr) => {
      acc.push(curr);
      if (curr.children && curr.children.length > 0) {
        acc.push(...flattenOptions(curr.children));
      }
      return acc;
    }, []);
  };

 

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
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}

MultiSelectorDropdown.propTypes = {
    onSelectData: PropTypes.func.isRequired
  };


export default MultiSelectorDropdown;
