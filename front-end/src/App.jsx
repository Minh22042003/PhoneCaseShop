import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import ProductSearch from './pages/ProductSearch/ProductSearch'
import Blog from './pages/Blog/Blog'
import Contact from './pages/Contact/Contact'

const App = () => {
  return (
    <div className='app'>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/product' element={<ProductSearch></ProductSearch>}></Route>
        <Route path='/cart' element={<Cart></Cart>}></Route>
        <Route path='/blog' element={<Blog></Blog>}></Route>
        <Route path='/contact' element={<Contact></Contact>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  )
}

export default App