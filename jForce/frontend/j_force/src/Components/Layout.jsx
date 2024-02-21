import React from 'react'
import { Outlet } from 'react-router-dom'
import App from '../App.js'
import { Container } from 'react-bootstrap'
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";


const Layout = () => {

  return (
    <div  >
      <Header />
      <Container>
        <Outlet />
      </Container>
    </div>
    )
}

export default Layout;
