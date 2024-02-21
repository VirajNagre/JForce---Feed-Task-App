import React from 'react'
import {Nav,Button,Badge,Container,Navbar,NavDropdown,Linkcontainer} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { UseSelector, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../Slices/UserSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  // let userInfo = true
  const userInfo = useSelector((state)=>state.auth).userInfo

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutHandler = async (e) =>{
    e.preventDefault()
    const logOut = logoutUser()
    dispatch(logoutUser())
    navigate('/login')
  }

  return (<>
<Navbar expand="lg"  collapseOnSelect>
 

    {/* <Navbar expand="md" collapseOnSelect> */}
        <Container>
          <Navbar.Brand href="/">
          <h1>FeedX</h1>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto justify-content-center">


              {userInfo ? (

                <NavDropdown id="name" title={`Hello ${userInfo.name}`}>
                  <LinkContainer to='/new'>
                    <NavDropdown.Item>Create New</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  {userInfo.isAdmin && 
                  <LinkContainer to='/admin'>
                    <NavDropdown.Item>Admin Portal</NavDropdown.Item>
                  </LinkContainer>
                  }

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                ) : (
                <Nav.Link href="/Login">
                   Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
 </>)
}

export default Header