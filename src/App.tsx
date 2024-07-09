
import './App.css'
import {CssBaseline, ThemeProvider, createTheme} from "@mui/material";
import { BrowserRouter, Navigate, Route,  Routes } from 'react-router-dom'
import { themeSettings } from './theme';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import Layout from './scenes/Layout.tsx';
import Products from './scenes/Products.tsx';
import Dashboard from './scenes/Dashboard.tsx';
import Customers from './scenes/Customers.tsx';
import Transactions from './scenes/Transactions.tsx';
import Geography from './scenes/Geography.tsx';
import OverView from './scenes/OverView.tsx';
import Daily from './scenes/Daily.tsx';
import Monthly from './scenes/Monthly.tsx';
import Breakdown from './scenes/Breakdown.tsx';
import Admin from './scenes/Admin.tsx';
import Performance from './scenes/Performance.tsx';
import Login from './scenes/Login.tsx';
import Register from './scenes/Register.tsx';
import ResetPassword from './scenes/ResetPassword.tsx';
import VerifyPassword from './scenes/VerifyPassword.tsx';
import VerifyAccount from './scenes/VerifyAccount.tsx';
import NotFound from './scenes/NotFound.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';



function App() {
  const mode = useSelector((state:any)=>state.global.mode);
  const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode])


  return (
    <div className='app'>
      <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
   
      <Routes  >
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='resetpassword' element={<ResetPassword/>}/>
      <Route path='verify/password' element={<VerifyPassword/>}/>
      <Route path='verify/account' element={<VerifyAccount/>}/>
      <Route path='*' element={<NotFound/>} />
      <Route element={<ProtectedRoute/>}>
      <Route element={<Layout />}>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
       <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/products" element={<Products />} />
       <Route path="/customers" element={<Customers />} />
       <Route path="/transactions" element={<Transactions />} />
       <Route path="/geography" element={<Geography />} />
       <Route path="/overview" element={<OverView />} />
       <Route path="/daily" element={<Daily />} />
       <Route path="/monthly" element={<Monthly />} />
       <Route path="/breakdown" element={<Breakdown />} />
       <Route path="/admin" element={<Admin/>} />
       <Route path="/performance" element={<Performance/>} />

       
        </Route>
        </Route>
      </Routes>

    </ThemeProvider>
    </BrowserRouter>
      
    </div>
  )
}

export default App
