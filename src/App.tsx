import './App.css'
import { Routes, Route } from 'react-router';
import OnlyAdmin from './components/auth/OnlyAdmin';
import Navbar from './components/Navbar'
import AdminProducts from './pages/AdminProductsPage';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { NotFoundPage } from './pages/NotFoundPage';
import ResponsiveAppBar from './components/Navbar2';
import AboutPage from './pages/AboutPage';
import ShopPage from './pages/ShopPage';
import ProductDetails from './pages/ProductDetails';
import ProductForm from './components/ProductForm';

function App() {

  return (
    <>
    <div className="flex min-h-screen bg-white-500">
      <div className="flex flex-col flex-1">
        {/* <Navbar /> */}
        <ResponsiveAppBar />

        {/* Main container */}
        <main className="w-screen flex-1 bb-red px-10">
          {/* <div className='central-section bb-black h-full w-[50%] m-auto'> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/:slug" element={<ProductDetails />} />
            <Route path="/admin/products" element={ <OnlyAdmin> {' '} <AdminProducts />{' '} </OnlyAdmin> } />
            <Route path="/admin/products/:formType" element={ <OnlyAdmin> {' '} <ProductForm />{' '} </OnlyAdmin> } />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<AboutPage />} />
            {/* <Route path="/user-profile" element={<OnlyPrivate> <UserProfilePage /> </OnlyPrivate>} /> */}

            {/* <Route path="/error" element={<ErrorPage />} /> */}
            <Route path="*" element={<NotFoundPage />} />

          </Routes>
          {/* </div> */}
        </main>
      </div>
      {/* Footer */}
    </div>
    </>
  )
}

export default App
