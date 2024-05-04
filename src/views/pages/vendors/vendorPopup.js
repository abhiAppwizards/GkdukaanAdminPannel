import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Select from 'react-select'
import useApi from 'src/api'

const VendorPopup = ({ onClose, editingId, onCall, onToast, component }) => {
  const [email, setEmail] = useState('')
  const [storeName, setStoreName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [transactionId, setTransactionId] = useState('')
  const [note, setNote] = useState('')
  const [approvel, setApprovel] = useState('')

  const { fetchData, token } = useApi()

  const options = [
    {
      value: 'true',
      label: 'True',
    },
    {
      value: 'false',
      label: 'False',
    },
  ]

  const handleApprovelChange = (selectedOption) => {
    console.log('selectedOption',selectedOption)
    setApprovel(selectedOption.value)
  }

  const fetchVendorData = async () => {
    try {
      const response = await fetchData(`/admin/vendor/${editingId}`, 'get')
      const { email, store_name, phoneNumber } = response
      setEmail(email)
      setStoreName(store_name)
      setPhoneNumber(phoneNumber)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchVendorData()
  }, [])

  const handleSave = async () => {
    try {
      await fetchData(`/admin/vendor/${editingId}`, 'put', {
        email: email,
        store_name: storeName,
        phoneNumber: phoneNumber,
        approved: approvel,
      })
      onToast('Data edited successfully')
      onCall()
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  const handlePayment = async () => {
    try {
      await fetchData(
        `/api/saveAdditionalData`,
        'post',
        {
          transactionId: transactionId,
          note: note,
        },
        {
          headers: {
            authorization: token,
          },
        },
      )
      onToast('Payment data saved successfully')
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="fixed top-14 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
      <ToastContainer />
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-lg font-semibold mb-4">Edit Vendor Details</h2>
        {component === 'vendorDetails' && (
          <>
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
            <div className="w-80 mb-3">
              <span className="mb-2" style={{ display: 'block' }}>
                Select Approvel<span style={{ color: 'red' }}>*</span>
              </span>{' '}
              <Select
                value={options.find((option) => option.value === approvel)}
                onChange={handleApprovelChange}
                options={options}
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
                  }),
                  menu: (provided, state) => ({
                    ...provided,
                  }),
                }}
              />
            </div>
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>{' '}
          </>
        )}
        {component === 'vendorPayment' && (
          <>
            <div className="mb-4">
              <label htmlFor="transactionId" className="block mb-1">
                Transaction ID
              </label>
              <input
                type="text"
                id="transactionId"
                className="w-full border rounded px-2 py-1"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="note" className="block mb-1">
                Note
              </label>
              <textarea
                id="note"
                className="w-full border rounded px-2 py-1"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </>
        )}
        {component === 'vendorPayment' && (
          <button
            onClick={handlePayment}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded ml-2"
          >
            Save
          </button>
        )}
        <button
          onClick={onClose}
          className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

VendorPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCall: PropTypes.func.isRequired,
  editingId: PropTypes.string.isRequired,
  onToast: PropTypes.func.isRequired,
  component: PropTypes.string.isRequired,
}

export default VendorPopup
