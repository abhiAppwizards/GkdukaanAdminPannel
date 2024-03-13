// import { CFormCFormInput } from '@coreui/react'
// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import config from 'src/config'

// function VendorView() {
//   const { id } = useParams()
//   const [vendor, setVendor] = useState()

//   useEffect(() => {
//     getOneVendor()
//   }, [])

//   const getOneVendor = async () => {
//     try {
//       const response = await axios.get(`${config.baseURL}/admin/vendor/${id}`)
//       console.log('one vendor', response.data)
//       setVendor(response.data)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return (
//     <div className="rounded p-4 shadow md:p-8 mb-8 bg-white justify-between">
//       <div className="d-inline-block">
//         <span style={{ display: 'block' }}>
//           Email
//         </span>
//         <CFormInput
//           style={{ width: '350px' }}
//           type="text"
//           name="state"
//         //   value={formData.state}
//         //   onChange={handleChange}
//         />
//       </div>
//       <div className="d-inline-block">
//         <span style={{ display: 'block' }}>
//           Email
//         </span>
//         <CFormInput
//           style={{ width: '350px' }}
//           type="text"
//           name="state"
//         //   value={formData.state}
//         //   onChange={handleChange}
//         />
//       </div>
//       <div className="d-inline-block">
//         <span style={{ display: 'block' }}>
//           Email
//         </span>
//         <CFormInput
//           style={{ width: '350px' }}
//           type="text"
//           name="state"
//         //   value={formData.state}
//         //   onChange={handleChange}
//         />
//       </div>
//     </div>
//   )
// }

// export default VendorView



import { CFormInput } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
// import { useParams } from 'react-router-dom'
import config from 'src/config'

const VendorView = (props) => {
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');

  console.log('props',props)
//   const { id } = useParams()
  const [vendor, setVendor] = useState()
  const { isOpen, onClose } = props;

  useEffect(() => {
    getOneVendor()
  }, [])

  const getOneVendor = async () => {
    try {
      const response = await axios.get(`${config.baseURL}/admin/vendor/${props.vendorId}`)
      console.log('one vendor data from popup', response.data)
      setVendor(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleField1Change = (e) => {
    setField1(e.target.value);
  };

  const handleField2Change = (e) => {
    setField2(e.target.value);
  };

  const handleField3Change = (e) => {
    setField3(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Field 1:', field1);
    console.log('Field 2:', field2);
    console.log('Field 3:', field3);
    // Close the VendorView
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">VendorView Box</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="field1" className="block text-sm font-medium text-gray-700">
                  Field 1
                </label>
                <CFormInput
                  type="text"
                  id="field1"
                  value={field1}
                  onChange={handleField1Change}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="field2" className="block text-sm font-medium text-gray-700">
                  Field 2
                </label>
                <CFormInput
                  type="text"
                  id="field2"
                  value={field2}
                  onChange={handleField2Change}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="field3" className="block text-sm font-medium text-gray-700">
                  Field 3
                </label>
                <CFormInput
                  type="text"
                  id="field3"
                  value={field3}
                  onChange={handleField3Change}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Submit
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

VendorView.propTypes = {
    isOpen: PropTypes.bool.isRequired, 
    onClose: PropTypes.func.isRequired, 
    vendorId: PropTypes.isRequired, 
  };

export default VendorView;
