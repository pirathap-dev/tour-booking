import './App.css';
import Home from './components/Home';
import Footer from './components/layouts/footer';
import Header from './components/layouts/header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import TourSearch from './components/tour/tourSearch';
import TourDetail from './components/tour/tourDeatail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadUser } from './actions/userActions';
import Login from './components/user/login';
import { useEffect} from 'react';
import store from './store'
import Register from './components/user/register';
import ProtectedRoute from './components/route/protectedRoute';
import Profile from './components/user/profile';
import UpdatePassword from './components/user/updatePassword';
import UpdateProfile from './components/user/updateProfile';
import ForgotPassword from './components/user/forgotPAssword';
import ResetPassword from './components/user/resetPassword';
import Cart from './components/cart/cart';
import Payment from './components/cart/payment';





function App() {

  useEffect(() => {
    store.dispatch(loadUser)
  }, [])

  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header />
          <div className="container container-fluid">
            <ToastContainer theme='dark' />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/search/:keyword' element={<TourSearch/>} />
              <Route path='/tour/:id' element={<TourDetail />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/myprofile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path='/myprofile/update' element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
              <Route path='/myprofile/update/password' element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
              <Route path='/password/forgot' element={<ForgotPassword />} />
              <Route path='/password/reset/:token' element={<ResetPassword />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/payment' element={<ProtectedRoute><Payment /></ProtectedRoute>} />
              {/* <Route path='/order/confirm' element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} /> */}
              {/* <Route path='/order/success' element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>} /> */}
              {/* <Route path='/orders' element={<ProtectedRoute><UserOrders/></ProtectedRoute>} /> */}
              {/* <Route path='/order/:id' element={<ProtectedRoute><OrderDetail/></ProtectedRoute>} /> */}
            </Routes>
          </div>

          {/* Admin Routes */}
          {/* <Routes> */}
            {/* <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute> } /> */}
            {/* <Route path='/admin/products' element={<ProtectedRoute isAdmin={true}><ProductList/></ProtectedRoute> } /> */}
            {/* <Route path='/admin/products/create' element={<ProtectedRoute isAdmin={true}><NewProduct/></ProtectedRoute> } /> */}
            {/* <Route path='/admin/product/:id' element={<ProtectedRoute isAdmin={true}><UpdateProduct/></ProtectedRoute> } /> */}
            {/* <Route path='/admin/orders' element={<ProtectedRoute isAdmin={true}><OrderList/></ProtectedRoute> } /> */}
            {/* <Route path='/admin/order/:id' element={<ProtectedRoute isAdmin={true}><UpdateOrder/></ProtectedRoute> } /> */}
            {/* <Route path='/admin/users' element={<ProtectedRoute isAdmin={true}><UserList/></ProtectedRoute> } /> */}
            {/* <Route path='/admin/user/:id' element={<ProtectedRoute isAdmin={true}><UpdateUser/></ProtectedRoute> } /> */}
            {/* <Route path='/admin/reviews' element={<ProtectedRoute isAdmin={true}><ReviewList/></ProtectedRoute> } /> */}
          {/* </Routes> */}
          <Footer />
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
