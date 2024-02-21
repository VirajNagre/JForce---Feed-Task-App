import React from 'react'
import { UseSelector, useSelector } from 'react-redux'
import { Outlet,Navigate } from "react-router-dom";

const AdminRoutes = () => {
    const userInfo = useSelector((state)=>(state.auth)).userInfo

    console.log(userInfo)
    
    return(userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/" />)
}

export default AdminRoutes