import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CSpinner } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import config from 'src/config';

function Address() {
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [addressData, setAddressData] = useState(null);
  const [formData, setFormData] = useState({
    address_line_1: '',
    state: '',
    pin_code: '',
    country: '',
    phone: '',
    city: '',
  });
  const [formChanged, setFormChanged] = useState(false); 

  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    setLoading(true);
    getAddress();
  }, []);

  const getAddress = async () => {
    try {
      const response = await axios.get(`${config.baseURL}/admin/settings/addresses`, {
        headers: {
          authorization: token,
        },
      });
      setAddressData(response.data);
      if (response.data.length > 0) {
        setFormData(response.data[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error while fetching address:', error);
    }
  };

  const handleSubmit = async () => {
    setButtonLoading(true);
    try {
      if (addressData && addressData.length > 0) {
        await axios.put(
          `${config.baseURL}/admin/settings/addresses/${addressData[0]._id}`,
          formData,
          {
            headers: {
              authorization: token,
            },
          }
        );
        toast.success('Address updated successfully');
      } else {
        await axios.post(`${config.baseURL}/admin/settings/addresses`, formData, {
          headers: {
            authorization: token,
          },
        });
        toast.success('Address added successfully');
      }
    } catch (error) {
      toast.error('Failed to update address');
      console.error('Error while updating address:', error);
    } finally {
      setButtonLoading(false);
      setFormChanged(false); 
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormChanged(true); 
  };

  return (
    <>
      {loading ? (
        <CSpinner className="text-blue-600" />
      ) : (
        <div>
          <ToastContainer />
          <div className="rounded bg-white p-4 shadow md:p-8 mb-8 flex flex-row items-center justify-between">
            <div className="md:w-1/4">
              <h2 className="relative text-lg font-semibold text-heading">Address</h2>
            </div>
          </div>
          <div className="rounded p-4 shadow md:p-8 mb-8 bg-white justify-between">
            <div className="border w-full mt-4 p-2 rounded-md">
              <table className="table-auto">
                <tbody>
                  {addressData && (
                    <>
                      <tr>
                        <td className="font-semibold pl-2 pr-32">Address :</td>
                        <td className="pl-4">
                          <input
                            className="w-full lg:w-80 px-2 py-1 border border-gray-300 rounded focus:outline-blue-400"
                            value={formData.address_line_1}
                            type="text"
                            name="address_line_1"
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold pl-2 pr-32">State :</td>
                        <td className="pl-4">
                          <input
                            className="w-full lg:w-80 px-2 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
                            value={formData.state}
                            type="text"
                            name="state"
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold pl-2 pr-32">Pin Code :</td>
                        <td className="pl-4">
                          <input
                            className="w-full lg:w-80 px-2 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
                            value={formData.pin_code}
                            type="text"
                            name="pin_code"
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold pl-2 pr-32">Country :</td>
                        <td className="pl-4">
                          <input
                            className="w-full lg:w-80 px-2 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
                            value={formData.country}
                            type="text"
                            name="country"
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold pl-2 pr-32">Phone :</td>
                        <td className="pl-4">
                          <input
                            className="w-full lg:w-80 px-2 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
                            value={formData.phone}
                            type="text"
                            name="phone"
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold pl-2 pr-32">City :</td>
                        <td className="pl-4">
                          <input
                            className="w-full lg:w-80 px-2 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
                            value={formData.city}
                            type="text"
                            name="city"
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
            <button
              className={`border p-1 w-24 rounded-md mt-4 ${
                buttonLoading || !formChanged ? 'bg-gray-400 cursor-not-allowed' : 'bg-slate-200 hover:bg-slate-100'
              } font-normal`}
              onClick={handleSubmit}
              disabled={buttonLoading || !formChanged}
            >
              {addressData && addressData.length > 0 ? 'Save' : 'Submit'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Address;
