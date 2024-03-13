// import React, { useState } from 'react';
// import { Form, Button } from 'react-bootstrap';
// import Select from 'react-select';
// import PropTypes from 'prop-types'; 

// const MultilevelDropdown = ({ options }) => {
//   // const [selectedValues, setSelectedValues] = useState({
//   //   category: null,
//   //   subcategory: null,
//   //   subsubcategory: null
//   // });

//   // const handleCategoryChange = (selectedOption) => {
//   //   setSelectedValues({
//   //     category: selectedOption,
//   //     subcategory: null,
//   //     subsubcategory: null
//   //   });
//   // };

//   // const handleSubcategoryChange = (selectedOption) => {
//   //   setSelectedValues({
//   //     ...selectedValues,
//   //     subcategory: selectedOption,
//   //     subsubcategory: null
//   //   });
//   // };

//   // const handleSubsubcategoryChange = (selectedOption) => {
//   //   setSelectedValues({
//   //     ...selectedValues,
//   //     subsubcategory: selectedOption
//   //   });
//   // };

//   // const handleSubmit = () => {
//   //   const { category, subcategory, subsubcategory } = selectedValues;
//   //   console.log("Selected category:", category?.value || category?.label);
//   //   console.log("Selected subcategory:", subcategory?.value || subcategory?.label);
//   //   console.log("Selected sub-subcategory:", subsubcategory?.value || subsubcategory?.label);
//   //   // Handle submit logic
//   // };
  
//   // const handleFileUpload = (e) => {
//   //   const file = e.target.files[0];
//   //   // Handle file upload logic
//   // };
  
//   return (
//     // <Form.Group>
//     //   <Form.Label>Select a category:</Form.Label>
//     //   <Select
//     //     value={selectedValues.category}
//     //     onChange={handleCategoryChange}
//     //     options={options}
//     //     isSearchable
//     //     placeholder="Search..."
//     //   />
//     //   {selectedValues.category && selectedValues.category.subcategories && (
//     //     <>
//     //       <Form.Label>Select a subcategory:</Form.Label>
//     //       <Select
//     //         value={selectedValues.subcategory}
//     //         onChange={handleSubcategoryChange}
//     //         options={selectedValues.category.subcategories}
//     //         isSearchable
//     //         placeholder="Search..."
//     //       />
//     //     </>
//     //   )}
//     //   {selectedValues.subcategory && selectedValues.subcategory.subsubcategories && (
//     //     <>
//     //       <Form.Label>Select a sub-subcategory:</Form.Label>
//     //       <Select
//     //         value={selectedValues.subsubcategory}
//     //         onChange={handleSubsubcategoryChange}
//     //         options={selectedValues.subcategory.subsubcategories}
//     //         isSearchable
//     //         placeholder="Search..."
//     //       />
//     //     </>
//     //   )}
//     //   {selectedValues.subsubcategory && (
//     //     <div className="file-upload">
//     //       <Form.Label>Upload a file:</Form.Label>
//     //       <div className="input-group">
//     //         <input
//     //           type="file"
//     //           className="form-control"
//     //           onChange={handleFileUpload}
//     //         />
//     //         {/* <Button variant="primary">Upload</Button> */}
//     //       </div>
//     //     </div>
//     //   )}
//     //   <div className='mt-5'>
//     //     <Button onClick={handleSubmit}>Submit</Button>
//     //   </div>
//     // </Form.Group>
//   );
// };

// // Add PropTypes validation
// MultilevelDropdown.propTypes = {
//   options: PropTypes.array.isRequired
// };

// export default MultilevelDropdown;
