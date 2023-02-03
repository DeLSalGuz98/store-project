import { Outlet } from 'react-router-dom'
import './App.css'

import { Header } from './components/header/header'

export function App() {

  return (
    <div className="App">
      <Header/>
      <Outlet/>
    </div>
  )
}
