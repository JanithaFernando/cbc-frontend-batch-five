import './App.css'
import Header from './components/header'
import ProductCard from "./components/productCard"
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import HomePage from './pages/home'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import AdminPage from './pages/adminPage'
import TestPage from './pages/testPage'
import { Toaster } from 'react-hot-toast';


function App() {

  return (
    <BrowserRouter>
      <div>
       {/* <Header/>*/}
        <Toaster position='top-right'/>
        <Routes path="/*">
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<RegisterPage/>}/>
          <Route path="/admin/*" element={<AdminPage/>}/>
          <Route path="/test" element={<TestPage/>}/>
          <Route path="/*" element={<HomePage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

