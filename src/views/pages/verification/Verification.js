import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CSpinner } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import config from 'src/config'
import DropDown from '../catalog/productComponent/Dropdown'

function VerifiactionDetails() {
  const [loading, setLoading] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [verify, setVerify] = useState(null)
  const [formData, setFormData] = useState({
    ID_number: '',
    type: '',
    status: '',
  })
  const [isDirty, setIsDirty] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('vendorToken')

  useEffect(() => {
    setLoading(true)
    getVerificationDetails()
  }, [])

  const optionsData = [
    { _id: 'active', title: 'Active' },
    { _id: 'inactive', title: 'Inactive' },
  ]

  const getVerificationDetails = async () => {
    try {
      const response = await axios.get(`${config.baseURL}/vendor/settings/documents`, {
        headers: {
          authorization: token,
        },
      })
      setVerify(response.data)
      if (response.data) {
        setFormData({
          ID_number: response.data.ID_number || '',
          type: response.data.type || '',
          status: response.data.status || '',
        })
      }
      setLoading(false)
    } catch (error) {
      console.error('Error while fetching Verification Details:', error)
    }
  }

  const handleSubmit = async () => {
    setButtonLoading(true);
    try {
      const dataToSend = {
        ID_number: formData.ID_number,
        type: formData.type,
        status: formData.status
      };
  
      if (verify) {
        await axios.put(`${config.baseURL}/vendor/settings/documents`, dataToSend, {
          headers: {
            authorization: token,
          },
        });
        toast.success('Verification Details updated successfully');
      } else {
        await axios.post(`${config.baseURL}/vendor/settings/documents`, dataToSend, {
          headers: {
            authorization: token,
          },
        });
        toast.success('Verification Details added successfully');
      }
      setIsDirty(false);
    } catch (error) {
      toast.error('Failed to update Verification Details');
    } finally {
      setButtonLoading(false);
    }
  }
  

  const handleChange = (selectedOption) => {
    setFormData({ ...formData, status: selectedOption });
    setIsDirty(true);
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'status') {
      setFormData(prevState => ({
        ...prevState,
        status: value
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
    setIsDirty(true);
  }

  return (
    <>
      {loading ? (
        <CSpinner className="text-blue-600" />
      ) : (
        <div>
          <ToastContainer />
          <div className="rounded bg-white p-4 shadow md:p-8 mb-8 flex flex-row items-center justify-between">
            <div className="md:w-1/4">
              <h2 className="relative text-lg font-semibold text-heading">Verification Details</h2>
            </div>
          </div>
          <div className="rounded p-4 shadow md:p-8 mb-8 bg-white justify-between">
            <div className="border w-full mt-4 p-2 rounded-md">
              <table className="table-auto">
                <tbody>
                  <>
                    <tr>
                      <td className="font-semibold pl-2 pr-32">Id Number :</td>
                      <td className="pl-4">
                        <input
                          className="w-full lg:w-80 px-2 py-1 border border-gray-300 rounded focus:outline-blue-400"
                          value={formData.ID_number}
                          type="text"
                          name="ID_number"
                          onChange={handleInputChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold pl-2 pr-32">Id Type :</td>
                      <td className="pl-4">
                        <input
                          className="w-full lg:w-80 px-2 py-1 mt-2 border border-gray-300 rounded focus:outline-blue-400"
                          value={formData.type}
                          type="text"
                          name="type"
                          onChange={handleInputChange}
                        />
                      </td>
                    </tr>
                    <tr className='justify-center items-center'>
                      <td className="font-semibold pl-2 pr-32">Your Status :</td>
                      <td className="pl-1 ">
                        <DropDown
                          label=''
                          optionsData={optionsData}
                          name= 'status'
                          value={formData.status}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                  </>
                </tbody>
              </table>
            </div>
            <button
              className={`border p-1 w-24 rounded-md mt-4 ${
                buttonLoading || !isDirty
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-slate-200 hover:bg-slate-100'
              } font-normal`}
              onClick={handleSubmit}
              disabled={buttonLoading || !isDirty}
            >
              {verify ? 'Save' : 'Submit'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default VerifiactionDetails
