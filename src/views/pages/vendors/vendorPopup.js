import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from 'src/config';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const VendorPopup = ({ onClose, editingId, onCall,onToast }) => {
  const [email, setEmail] = useState('');
  const [storeName, setStoreName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem('adminToken');

  const fetchVendorData = async () => {
    try {
      const response = await axios.get(`${config.baseURL}/admin/vendor/${editingId}`, {
        headers: {
          authorization: token,
        },
      });
      const { email, store_name, phoneNumber } = response.data;
      setEmail(email);
      setStoreName(store_name);
      setPhoneNumber(phoneNumber);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVendorData();
  }, []);

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${config.baseURL}/admin/vendor/${editingId}`,
        {
          email: email,
          store_name: storeName,
          phoneNumber: phoneNumber,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      // console.log('Vendor data updated successfully', response.data);
      onToast('Data edited successfully');
      onCall();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed top-14 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
      <ToastContainer />
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-lg font-semibold mb-4">Edit Vendor Details</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border rounded px-2 py-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="storeName" className="block mb-1">
            Store Name
          </label>
          <input
            type="text"
            id="storeName"
            className="w-full border rounded px-2 py-1"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            className="w-full border rounded px-2 py-1"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

VendorPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCall: PropTypes.func.isRequired,
  editingId: PropTypes.number.isRequired,
  onToast: PropTypes.func.isRequired,
  component: PropTypes.string.isRequired,
};

export default VendorPopup;
