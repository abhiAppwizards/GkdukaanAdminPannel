import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'
import Select from 'react-select'
import { Container, Row, Col } from 'react-bootstrap'

function DropDown({ optionsData, value, label, onChange, className, placeholder }) {
  const selectOptions = optionsData?.map((option) => {
    return {
      value: option._id,
      label: option.name,
    }
  })

  const handleChange = (selectedOption) => {
    onChange(selectedOption)
  }

  return (
    <Row>
      <Col>
        <Form.Group>
          <Form.Label>{label}</Form.Label>
          <Select
            value={selectOptions?.find((option) => option.value === value)}
            onChange={handleChange}
            options={selectOptions}
            className={`w-full ${className}`}
            isSearchable
            placeholder={`${placeholder}`}
            styles={{
              option: (provided, state) => ({
                ...provided,
                backgroundColor: 'white',
                color: 'black',
              }),
              control: (provided, state) => ({
                ...provided,
              }),
              menu: (provided, state) => ({
                ...provided,
              }),
            }}
          />
        </Form.Group>
      </Col>
    </Row>
  )
}

// PropTypes validation
DropDown.propTypes = {
  optionsData: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default DropDown
