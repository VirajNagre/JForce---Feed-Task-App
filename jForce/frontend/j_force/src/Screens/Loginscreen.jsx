import React from 'react'
import {Form,Button} from 'react-bootstrap'
import { useState,useContext } from 'react'
import axios from 'axios'
import { useLoginMutation } from "../Slices/userApiSlice.js";
import { setCredentials } from "../Slices/UserSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const Loginscreen = () => {

  const [login, { isLoading,isError }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setemail] = useState("")
  const [password, setpwd] = useState("")
  
  const loginFormHandler = async(e)=>{
    e.preventDefault()
    
    const body={
      email,
      password
    }

    // console.log(body)
    try {
      const logResp = await login(body).unwrap();
      toast.success("Logged In")
      dispatch(setCredentials({...logResp}))
      navigate("/");
      
    } catch (error) {
      console.log(error)
      toast.error(error.message || error.data.message || "Something went wrong")
    // alert(error)
    }


  }

  return (<>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setemail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setpwd(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={loginFormHandler}>
        Sign In
      </Button>
      <Toaster />
    </Form>
    <p>New User? <Link to={'/register'} className='text-decoration-none'>Sign Up</Link></p>
  </>)
}

export default Loginscreen