import React from 'react'

const Dashboard = React.lazy(() => import('./views/pages/dashboard/Dashboard'))
const Home = React.lazy(() => import('./views/pages/Home/Home'))
const MobileHome = React.lazy(() => import('./views/pages/mobileHome/MobileHome'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))


//orders
const Pending = React.lazy(() => import('./views/pages/orders/OrderPending'))
const Cancelled = React.lazy(() => import('./views/pages/orders/OrderCancelled'))
const AllOrders = React.lazy(() => import('./views/pages/orders/AllOrders'))
const View = React.lazy(() => import('./views/pages/orders/View'))



//Categories
const AllCategories = React.lazy(() => import('./views/pages/categories/AllCategory'))
const AddCategories = React.lazy(() => import('./views/pages/categories/AddCategory'))

//Vendors
const AllVendors = React.lazy(()=> import('./views/pages/vendors/AllVendors'))

//Attributes
const AllAttributes = React.lazy(() => import('./views/pages/attributes/AllAttributes'))

//rto
const RtoOrders = React.lazy(() => import('./views/pages/rtoorders/RtoOrders'))
//Payments
const Payments = React.lazy(() => import('./views/pages/Payments/Payments'))
//vendor Payments
const VendorPayments = React.lazy(() => import('./views/pages/vendors/VendorPayment'))
//Notice
const Customers = React.lazy(() => import('./views/pages/notice/CustomerNotice'))
const VendorNotice = React.lazy(() => import('./views/pages/notice/VendorNotice'))
//Settings
const Settings = React.lazy(() => import('./views/pages/settings/Settings'))
//Reviews
const Reviews = React.lazy(() => import('./views/pages/reviews/Reviews'))
//Support
const Support = React.lazy(() => import('./views/pages/support/Support'))
const SupportMessages = React.lazy(() => import('./views/pages/support/TicketMessages'))
//Store
const Store = React.lazy(() => import('./views/pages/store/Store'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/home', name: 'Home', element: Home },
  { path: '/mobilehome', name: 'Mobile Home', element: MobileHome },
  
  //orders
  { path: '/orders', name: 'Orders', element: Cards, exact: true },
  { path: '/orders/pending', name: 'Pending', element: Pending },
  { path: '/orders/cancelled', name: 'Cancelled', element: Cancelled },
  { path: '/orders/all', name: 'AllOrders', element: AllOrders },
  { path: '/orders/all/views/:id', name: 'View', element: View },
  //Categories
  { path: '/categories', name: 'Categories', element: Cards, exact: true },
  { path: '/categories/all', name: 'All', element: AllCategories },
  { path: '/categories/add', name: 'Add', element: AddCategories },
  //Details
  { path: '/categories/add', name: 'Add', element: AddCategories },
  //rto
  { path: '/rtoorders', name: 'Rto Orders', element: RtoOrders },
  //vendors
  { path: '/vendors', name: 'Vendors', element: Cards, exact: true },
  {path: '/vendors/all', name: 'All', element: AllVendors},
  //Payments
  { path: '/payments', name: 'Payments', element: Payments },
  //vendor Payments
  { path: '/vendorpayments', name: 'Vendor Payments', element: VendorPayments },
  //vendors
  { path: '/notice', name: 'Notice', element: Cards, exact: true },
  {path: '/notice/customers', name: 'Customers', element: Customers},
  {path: '/notice/vendors', name: 'Vendors', element: VendorNotice},
  //Settings
  { path: '/settings', name: 'Settings', element: Settings },
  //Reviews
  { path: '/reviews', name: 'Reviews', element: Reviews },
  //Attributes
  { path: '/attributes', name: 'Attributes ', element: AllAttributes },
  //Support
  { path: '/support', name: 'Support', element: Support },
  { path: '/support/messages/:id', name: 'Messages', element: SupportMessages },
]

export default routes
