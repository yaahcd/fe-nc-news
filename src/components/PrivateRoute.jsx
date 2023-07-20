import { Navigate, Outlet } from "react-router-dom"
import { useContext, useState } from "react"
import BlogContext from "../contexts/BlogContext"

function PrivateRoute() {

  const {user, setUser} = useContext(BlogContext)
  
  return user === window.localStorage.getItem('user') && user ? <Outlet /> : <Navigate to="/sign_in" />
}

export default PrivateRoute
