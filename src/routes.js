import React from 'react'

const Dashboard = React.lazy(() => import('./views/pages/dashboard/Dashboard'))
const Home = React.lazy(() => import('./views/pages/Home/Home'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

//orders
const Pending = React.lazy(() => import('./views/pages/orders/OrderPending'))
const Cancelled = React.lazy(() => import('./views/pages/orders/OrderCancelled'))
const AllOrders = React.lazy(() => import('./views/pages/orders/AllOrders'))
const View = React.lazy(() => import('./views/pages/orders/View'))


//Verification
const Verification = React.lazy(()=> import('./views/pages/verification/Verification'))

//Products
const AllProducts = React.lazy(() => import('./views/products/Allproducts'))
// const AddCatalog = React.lazy(() => import('./views/products/addcatalogs/AddCatalog'))
// const AddSingleProduct = React.lazy(() => import('./views/products/addcatalogs/AddSingleCatalog'))
const ProductDetails = React.lazy(() => import('./views/products/addcatalogs/AddProductDetails'))
const EditProduct = React.lazy(()=> import('./views/products/Editproduct'))

//Catalogs
const AllCatalogs = React.lazy(() => import('./views/pages/catalogs/Allcatalogs'))
const AddCatalog = React.lazy(() => import('./views/pages/catalogs/addcatalogs/Addcatalog'))
const AddSingleProduct = React.lazy(() => import('./views/pages/catalogs/addcatalogs/AddSingleProduct'))
const AddBulkProducts = React.lazy(() => import('./views/pages/catalogs/addcatalogs/AddBulkProducts'))
const CatalogDetails = React.lazy(() => import('./views/pages/catalogs/addcatalogs/CatalogDetails'))

//Categories
const AllCategories = React.lazy(() => import('./views/pages/categories/AllCategory'))
const AddCategories = React.lazy(() => import('./views/pages/categories/AddCategory'))

//Vendors
const AllVendors = React.lazy(()=> import('./views/pages/vendors/AllVendors'))
const VendorView = React.lazy(()=> import('./views/pages/vendors/vendorView'))

//Reviews
//Attributes
const AllAttributes = React.lazy(() => import('./views/pages/attributes/AllAttributes'))

//rto
const RtoOrders = React.lazy(() => import('./views/pages/rtoorders/RtoOrders'))
//Payments
const Payments = React.lazy(() => import('./views/pages/Payments/Payments'))
//vendor Payments
const VendorPayments = React.lazy(() => import('./views/pages/vendors/VendorPayment'))
//Notice
const Notice = React.lazy(() => import('./views/pages/notice/Notice'))
//Settings
const Settings = React.lazy(() => import('./views/pages/settings/Settings'))
//Reviews
const Reviews = React.lazy(() => import('./views/pages/reviews/Reviews'))
//Support
const Support = React.lazy(() => import('./views/pages/support/Support'))
const SupportMessages = React.lazy(() => import('./views/pages/support/TicketMessages'))
//Store
const Store = React.lazy(() => import('./views/pages/store/Store'))
//Media
const Media = React.lazy(() => import('./views/pages/media/Media'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/home', name: 'Home', element: Home },
  
  //orders
  { path: '/orders', name: 'Orders', element: Cards, exact: true },
  { path: '/orders/pending', name: 'Pending', element: Pending },
  { path: '/orders/cancelled', name: 'Cancelled', element: Cancelled },
  { path: '/orders/all', name: 'AllOrders', element: AllOrders },
  { path: '/orders/all/views/:id', name: 'View', element: View },
  //Catalogs
  { path: '/catalogs', name: 'Catalogs', element: Cards, exact: true },
  { path: '/catalogs/all', name: 'All', element: AllCatalogs },
  // { path: '/catalogs/all/:id', name: 'Edit Catalog', element: EditCatalog},
  { path: '/catalogs/add', name: 'Add', element: AddCatalog },
  { path: '/catalogs/add/single', name: 'Single Product', element: AddSingleProduct },
  { path: '/catalogs/add/single/catalog', name: 'Add Details', element: CatalogDetails },
  { path: '/catalogs/add/bulk', name: 'Add Bulk Products', element: AddBulkProducts },
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
  {path: '/vendors/all/:id', name: 'vendor', element: VendorView},
  //Payments
  { path: '/payments', name: 'Payments', element: Payments },
  //vendor Payments
  { path: '/vendorpayments', name: 'Vendor Payments', element: VendorPayments },
  //Notice
  { path: '/notice', name: 'Notice', element: Notice },
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
