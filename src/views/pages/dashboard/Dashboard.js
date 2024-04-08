import React, { useEffect, useState } from 'react'
import useApi from 'src/api'
import { CSpinner } from '@coreui/react'


function Dashboard() {
  const [data, setData] = useState({})
  const [isFetching, setIsFetching] = useState(true)

  const { fetchData } = useApi();


  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const res = await fetchData(`/admin/dashboard`, 'get');
    setIsFetching(false)
    setData(res)
  }

  return (
    <>
     {isFetching ? (
          <div className="flex justify-center my-8">
            <CSpinner color="primary" />
          </div>
        ) : ((<div>
      <div className="bg-white rounded-md p-3 shadow-md">
        <h1 className="font-semibold text-lg">Dashboard</h1>
      </div>
      <div className="bg-white rounded-md mt-3 p-3 shadow-md">
        <div className="w-96">
          <div className="flex justify-between items-center">
            <h2 className="font-mono">Total Sales</h2>
            <input
              readOnly
              value={`${data.totalSales || ''} Rs`}
              placeholder="in Rs"
              className="border shadow-sm px-2 py-1 rounded focus:outline-blue-500"
            />
          </div>
          <div className="flex justify-between mt-2 items-center">
            <h2 className="font-mono">Total Vendors</h2>
            <input
              value={data.totalVendors || ''}
              readOnly
              className="border shadow-sm px-2 py-1 rounded focus:outline-blue-500"
            />
          </div>
          <div className="flex justify-between mt-2 items-center">
            <h2 className="font-mono">Total Products</h2>
            <input
              readOnly
              value={data.totalProducts || ''}
              className="border shadow-sm px-2 py-1 rounded focus:outline-blue-500"
            />
          </div>
          <div className="flex justify-between mt-2 items-center">
            <h2 className="font-mono">Total Orders</h2>
            <input
              value={data.totalOrders || ''}
              readOnly
              className="border shadow-sm px-2 py-1 rounded focus:outline-blue-500"
            />
          </div>
        </div>
      </div>
      <div className="mb-8 mt-3 rounded-lg bg-white bg-light -3 md:p-8 overflow-x-auto">
        <h1 className="font-bold text-xl mb-4"> Top Products :-</h1>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3 text-center">Product Name</th>
              <th className="px-6 py-3 text-center">MRP</th>
              <th className="px-6 py-3 text-center">Pick Up Time</th>
              <th className="px-6 py-3 text-center">SKU</th>
              <th className="px-6 py-3 text-center">Approvel</th>
              <th className="px-6 py-3 text-center">In stock</th>
            </tr>
          </thead>
          <tbody>
            {data.topProducts?.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-gray-100 bg-white border-b dark:bg-gray-800  dark:border-gray-700"
              >
                <td className="px-6 py-4 text-center">{product.name}</td>
                <td className="px-6 py-4 text-center">{product.mrp}</td>
                <td className="px-6 py-4 text-center">{product.pickup_time}</td>
                <td className="px-6 py-4 text-center">{product.sku}</td>
                <td className="px-6 py-4 text-center">{product.approved ? 'Approved' : 'Rejected'}</td>
                <td className="text-center">
                  <div className="flex justify-center items-center rtl:space-x-reverse">
                  <span className={`inline-block px-3 text-center py-1.5 rounded ${product.in_stock ? 'bg-green-600' : 'bg-red-600'} text-xs whitespace-nowrap relative font-medium text-dark bg-accent bg-opacity-10 text-accent capitalize`}>
                      {product.in_stock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mb-8 mt-3 rounded-lg bg-white bg-light -3 md:p-8 overflow-x-auto">
        <h1 className="font-bold text-xl mb-4"> Top Vendors :-</h1>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3 text-center">Store Name</th>
              <th className="px-6 py-3 text-center">Number</th>
              <th className="px-6 py-3 text-center">Email</th>
              <th className="px-6 py-3 text-center">Approvel</th>
              <th className="px-6 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.topVendors?.map((vendor) => (
              <tr
                key={vendor._id}
                className="hover:bg-gray-100 bg-white border-b dark:bg-gray-800  dark:border-gray-700"
              >
                <td className="px-6 py-4 text-center">{vendor.store_name}</td>
                <td className="px-6 py-4 text-center">{vendor.phoneNumber}</td>
                <td className="px-6 py-4 text-center">{vendor.email}</td>
                <td className="px-6 py-4 text-center">{vendor.approved === true? 'Approved' : 'Rejected'}</td>
                <td className="text-center">
                  <div className="flex justify-center items-center rtl:space-x-reverse">
                    <span className="inline-block px-3 text-center py-1.5 rounded bg-red-600 text-xs whitespace-nowrap relative font-medium text-dark bg-accent bg-opacity-10 !text-accent capitalize">
                      {vendor.account_status}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>))}
    </>
  )
}

export default Dashboard
