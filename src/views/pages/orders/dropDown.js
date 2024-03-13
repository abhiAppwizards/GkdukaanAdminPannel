// DropDown.js
import React, { useState } from 'react';
import PropTypes from 'prop-types'; 
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import { Container, Row, Col } from 'react-bootstrap';

function DropDown({ optionsData, label }) {
  const [selectedValues, setSelectedValues] = useState({ category: null });

  const handleCategoryChange = (selectedOption) => {
    setSelectedValues({
      category: selectedOption,
      // subcategory: null,
      // subsubcategory: null,
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Select
              value={selectedValues.category}
              onChange={handleCategoryChange}
              options={optionsData}
              isSearchable
              placeholder="Search..."
              styles={{
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: 'white',
                  color: 'black',
                }),
                control: (provided, state) => ({
                  ...provided,
                  width: '150px',
                }),
                menu: (provided, state) => ({
                  ...provided,
                  width: '150px',
                }),
              }}
            />
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
}

// PropTypes validation
DropDown.propTypes = {
  optionsData: PropTypes.array.isRequired, 
  label: PropTypes.string.isRequired,
};

export default DropDown;
