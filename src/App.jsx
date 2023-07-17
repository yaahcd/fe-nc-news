import './App.css'
import {BlogProvider }from './contexts/BlogContext'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'

function App() {


  return (
    <BlogProvider>
      <Home />
     <Routes>
     </Routes>
    </BlogProvider>
  )
}

export default App
