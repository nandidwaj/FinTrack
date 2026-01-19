import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Bills from './pages/Bills'
import Budgets from './pages/Budgets'
import Pots from './pages/Pots'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/transactions' element={<Transactions/>}></Route>
      <Route path='/bills' element={<Bills/>}></Route>
      <Route path='/budgets' element={<Budgets/>}></Route>
      <Route path='/pots' element={<Pots/>}></Route>
    </Routes>
    </BrowserRouter>
    
  )
}

export default App
