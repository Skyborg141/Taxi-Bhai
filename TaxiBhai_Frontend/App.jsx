
//Parent  page of the  website

import { Outlet } from 'react-router-dom'
import './App.css'
import NavBar from './NavBar/NavBar'

function App() {
  

  return (
    <>
      
     <NavBar></NavBar>
     
    <Outlet></Outlet>  {/* children component will be rendered here by Outlet */}
    </>
  )
}

export default App
