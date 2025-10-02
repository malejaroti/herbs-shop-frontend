import './App.css'
import { Routes, Route } from 'react-router';
import OnlyAdmin from './components/auth/OnlyAdmin';
import AdminProducts from './pages/AdminProductsPage';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { NotFoundPage } from './pages/NotFoundPage';
import ResponsiveAppBar from './components/layout/Navbar2';
import AboutPage from './pages/AboutPage';
import ShopPage from './pages/ShopPage';
import ProductDetails from './pages/ProductDetails';
import ProductForm from './components/ProductForm';
import ErrorPage from './pages/ErrorPage';
import CreateProductPage from './pages/CreateProductPage';
import UpdateProductPage from './pages/UpdateProductPage';

function App() {

  return (
    <>
      <div className="flex w-screen min-h-screen bg-white-500">
        <div className="flex flex-col flex-1">
          {/* <Navbar /> */}
          <ResponsiveAppBar />

          {/* Main container */}
          <main className="">
            {/* <div className='central-section bb-black h-full w-[50%] m-auto'> */}
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/" element={<ShopPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/:slug" element={<ProductDetails />} />
              <Route path="/admin/products" element={<OnlyAdmin><AdminProducts/></OnlyAdmin>} />
              {/* <Route path="/admin/products/:formType" element={<OnlyAdmin><ProductForm /></OnlyAdmin>} /> */}
              <Route path="/admin/products/create" element={<OnlyAdmin><CreateProductPage/></OnlyAdmin>} />
              <Route path="/admin/products/:productId/update" element={<OnlyAdmin><UpdateProductPage/></OnlyAdmin>} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<AboutPage />} />
              {/* <Route path="/user-profile" element={<OnlyPrivate> <UserProfilePage /> </OnlyPrivate>} /> */}

              <Route path="/error" element={<ErrorPage />} />
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
