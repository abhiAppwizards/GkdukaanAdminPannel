import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

function View() {
  const [selectedStatus, setSelectedStatus] = useState('')

  const status = [
    { status: 'order pending' },
    { status: 'order processing' },
    { status: 'order at localfacility' },
  ]
  const allStatus = status.map((data) => data.status)
  const {id} = useParams();

  const statusChange = (status) => {
    setSelectedStatus(status)
  }


  const getDetails = () => {
    
  }
  return (
    <>
      <div className="h-full p-4 md:p-8">
        <div className="rounded bg-white p-5 shadow md:p-8 relative overflow-hidden">
          <div className="mb-6 -ml-5 -mr-5 md:-mr-8 md:-ml-8 md:-mt-8">
            <div className="bg-[#F7F8FA] px-8 py-4">
              <div className="mb-0 flex flex-col flex-wrap items-center justify-between gap-x-8 text-base font-bold text-heading sm:flex-row lg:flex-nowrap">
                <div className="order-2 flex  w-full gap-6 sm:order-1 max-w-full basis-full justify-between">
                  <div>
                    <span className="mb-2 block lg:mb-0 lg:inline-block lg:ltr:mr-4 lg:rtl:ml-4">
                      Order Status :
                    </span>
                    <span className="inline-block px-4 bg-black text-red-700 py-1.5 rounded text-xs whitespace-nowrap relative font-medium bg-status-processing bg-opacity-10 text-status-processing">
                      Pending
                    </span>
                  </div>
                  <div>
                    <span className="mb-2 block lg:mb-0 lg:inline-block lg:ltr:mr-4 lg:rtl:ml-4">
                      Payment Status :
                    </span>
                    <span className="inline-block px-3 py-1.5 rounded text-xs whitespace-nowrap relative font-medium bg-black text-green-800  bg-opacity-10">
                      Cash On Delivery
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between lg:flex-row">
            <h3 className="mb-8 w-full whitespace-nowrap text-center text-2xl font-semibold text-heading lg:mb-0 lg:w-1/3 lg:text-start">
              Order ID - 20240207303639
            </h3>
            <div className="w-1/2 flex">
              {/* <DropDown
                label={'Filter by Product Type'}
                optionsData={allStatus}
                value={selectedStatus}
                onChange={statusChange}
              /> */}
              <div className="justify-center w-64 mt-7">
                <button className="border p-2 rounded-md bg-green-500 hover:bg-gray-200 text-black">
                  Change Status
                </button>
              </div>
            </div>
          </div>
          <div className="mb-10 mt-6">
            <table className="w-full text-sm text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left">
                    Products
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-6 py-4">
                    <div className="flex flex-row space-x-4">
                      <div>Product 1</div>
                      <div>Data here</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end">
                      <div>$10</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <div className="flex flex-row space-x-4">
                      <div>Product 2</div>
                      <div>Data here</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end">
                      <div>$10</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-4"></td>
                  <td className=" py-4">
                    <div className="flex justify-end">
                      <div className="flex w-full flex-col space-y-2 border-t-4 border-double border-border-200 px-4 py-4 ms-auto sm:w-1/2 md:w-1/3">
                        <div className="flex items-center justify-between text-sm text-body">
                          <span>Sub total</span>
                          <span>$14.50</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-body">
                          <span>Shipping Charge</span>
                          <span>$50.00</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-body">
                          <span>Tax</span>
                          <span>$0.29</span>
                        </div>
                        <div className="flex items-center justify-between text-base font-semibold text-heading">
                          <span>Total</span>
                          <span>$64.79</span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
            <div className="mb-10 w-full sm:mb-0 sm:w-1/2 sm:pe-8">
              <h3 className="mb-3 border-b border-border-200 pb-2 font-semibold text-heading">
                Order Details
              </h3>
              <div className="flex flex-col items-start space-y-1 text-sm text-body">
                <span>6 Items</span>
                <span>Express Delivery</span>
                <span>Payment Method: CASH_ON_DELIVERY</span>
              </div>
            </div>
            <div className="mb-10 w-full sm:mb-0 sm:w-1/2 sm:pe-8">
              <h3 className="mb-3 border-b border-border-200 pb-2 font-semibold text-heading">
                Billing Address
              </h3>
              <div className="flex flex-col items-start space-y-1 text-sm text-body">
                <span>Customer</span>
                <span>2231 Kidd Avenue, Kipnuk, AK, 99614, United States</span>
                <span>+1 9365141641631</span>
              </div>
            </div>
            <div className="w-full sm:w-1/2 sm:ps-8">
              <h3 className="mb-3 border-b border-border-200 pb-2 font-semibold text-heading text-start sm:text-end">
                Shipping Address
              </h3>
              <div className="flex flex-col items-start space-y-1 text-sm text-body">
                <span>Customer</span>
                <span>2148 Straford Park, Winchester, KY, 40391, United States</span>
                <span>+1 9365141641631</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default View
