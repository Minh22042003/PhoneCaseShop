import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import ProductSearch from './pages/ProductSearch/ProductSearch'
import Blog from './pages/Blog/Blog'
import Contact from './pages/Contact/Contact'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import DesighPhoneCase from './pages/DesighPhoneCase/DesighPhoneCase'
import UserDetails from './pages/UserDetails/UserDetails'
import EditUser from './pages/EditUser/EditUser'
import Order from './pages/Order/Order'
import OrderProcess from './pages/OrderProcess/OrderProcess'

import { CartModalProvider } from './context/CartModalContext'
import CartAddModal from './components/CartAddModal/CartAddModal'
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <div className='app'>
        <CartModalProvider>
          <CartAddModal onConfirmAdd={() => { /* implement add-to-cart behavior here */ }} />
          <Navbar></Navbar>
          <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/product' element={<ProductSearch></ProductSearch>}></Route>
            <Route path='/cart' element={<Cart></Cart>}></Route>
            <Route path='/blog' element={<Blog></Blog>}></Route>
            <Route path='/contact' element={<Contact></Contact>}></Route>
            <Route path='/cart' element={<Cart></Cart>}></Route>
            <Route path='/custom' element={<DesighPhoneCase></DesighPhoneCase>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/register' element={<Register></Register>}></Route>
            <Route path='/user/:id' element={<UserDetails></UserDetails>}></Route>
            <Route path='/user/edit/:id' element={<EditUser></EditUser>}></Route>
            <Route path='/order' element={<Order></Order>}></Route>
            <Route path='/order-process' element={<OrderProcess></OrderProcess>}></Route>
          </Routes>
          <Footer></Footer>
        </CartModalProvider>
      </div>
    </AuthProvider>
  )
}

export default App