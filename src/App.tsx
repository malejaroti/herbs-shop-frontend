import './App.css'
import { Routes, Route } from 'react-router';
import OnlyAdmin from './components/auth/OnlyAdmin';
import Navbar from './components/Navbar'
import AdminProducts from './pages/AdminProductsPage';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {

  return (
    <>
    <div className="flex min-h-screen bg-white-500">
      <div className="flex flex-col flex-1">
        <Navbar />

        {/* Main container */}
        <main className="w-screen flex-1 bb-red px-10">
          {/* <div className='central-section bb-black h-full w-[50%] m-auto'> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/products" 
                    element={ <OnlyAdmin> {' '}
                                <AdminProducts />{' '}
                              </OnlyAdmin>
              }
            />
            {/* <Route path="/user-profile" element={<OnlyPrivate> <UserProfilePage /> </OnlyPrivate>} /> */}
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

            {/* <Route path="/error" element={<ErrorPage />} /> */}
            <Route path="*" element={<NotFoundPage />} />
            {/* <Route path="/about" element={<AboutPage />} /> */}

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
