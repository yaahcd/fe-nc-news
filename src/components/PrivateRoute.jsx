import { Navigate, Outlet } from "react-router-dom"
import { useContext, useState } from "react"
import Loading from "./Loading"
import BlogContext from "../contexts/BlogContext"

function PrivateRoute() {

  const {user} = useContext(BlogContext)
  
  return user ? <Outlet /> : <Navigate to="/sign_in" />
}

export default PrivateRoute
