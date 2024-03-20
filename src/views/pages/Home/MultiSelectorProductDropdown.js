import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Multiselect from 'multiselect-react-dropdown';
import config from 'src/config';
import axios from 'axios';
import PropTypes from 'prop-types'; 

function MultiSelectorProductDropdown({ onSelectData }) {
  const [options, setOptions] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${config.baseURL}/admin/product`, {
          headers: {
            authorization: token
          }
        });

        const productNames = res.data.map(product => ({
          name: product.name,
          id: product._id
        }));

        setOptions(productNames);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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
