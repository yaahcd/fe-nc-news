import './App.css'
import {BlogProvider }from './contexts/BlogContext'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'

function App() {


  return (
    <BlogProvider>
     <Routes>
      <Route path='/' element={<Home />} />
     </Routes>
     <Navbar />
    </BlogProvider>
  )
}

export default App
