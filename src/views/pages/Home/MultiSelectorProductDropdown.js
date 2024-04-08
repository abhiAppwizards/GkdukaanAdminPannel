import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Multiselect from 'multiselect-react-dropdown';
import PropTypes from 'prop-types'; 
import useApi from 'src/api';

function MultiSelectorProductDropdown({ onSelectData }) {
  const [options, setOptions] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const { loading, error, fetchData, token } = useApi();


  useEffect(() => {
    const getData = async () => {
      try {
        const res =await fetchData('/admin/product','get');
        if (Array.isArray(res)) {
          const productNames = res.map(product => ({
            name: product.name || '', 
            id: product._id
          }));
          setOptions(productNames);
        } else {
          console.error('Error: Data received is not an array');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (token) {
      getData();
    }
  }, [token]);

  const handleSelect = (selectedList, selectedItem) => {
    setSelectedIds(selectedList.map(item => item.id));
    onSelectData(selectedList.map(item => item.id));
  };

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

MultiSelectorProductDropdown.propTypes = {
  onSelectData: PropTypes.func.isRequired
};

export default MultiSelectorProductDropdown;


