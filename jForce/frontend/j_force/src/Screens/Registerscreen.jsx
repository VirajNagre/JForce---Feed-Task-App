import React from 'react'
import {Form,Button} from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {useRegisterMutation} from '../Slices/userApiSlice'
import toast, { Toaster } from 'react-hot-toast';

const Registerscreen = () => {

  const [register,{isLoading,isError}]= useRegisterMutation()

  const navigate = useNavigate()

  const [email, setemail] = useState("")
  const [name, setname] = useState("")
  const [password, setpwd] = useState("")
  const [password2, setpwd2] = useState("")
  const [phone, setphone] = useState(0)

  const registerFormHandler = async (e)=>{
    e.preventDefault()
    // alert("required ")
    if ((name && email && password && password2 && phone)&& (password === password2)){
      const body={
        name,
        email,
        password,
        phone
      }
      console.log(body)
      try {
        const regResp = await register(body)
        toast.success("successfully registered")
        navigate('/login')
        console.log(regResp)
      } catch (error) {
        console.log(error)
        toast.error(error.message || error.data.message || "Something went wrong")
        // alert(error)
      }
      
    }else{
      // alert("Please check your details")
      toast.error("Please check your details")
    }

  }


  return (
    <Form>
    <Form.Group className="mb-3" controlId="email">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" value={email} required  onChange={(e)=>setemail(e.target.value)}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="name">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" placeholder="Name" value={name} required  onChange={(e)=>setname(e.target.value)} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="phone">
      <Form.Label>Phone</Form.Label>
      <Form.Control type="number" placeholder="Enter your number" min={0} minLength={10} required value={phone?phone:''} onChange={(e)=>setphone(e.target.value)} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="password">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" value={password} required  onChange={(e)=>setpwd(e.target.value)} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="ConfirmPassword">
      <Form.Label>Confirm Password</Form.Label>
      <Form.Control type="password" placeholder="Confirm Password" value={password2} required  onChange={(e)=>setpwd2(e.target.value)} />
    </Form.Group>
    <Button variant="primary" type="submit" onClick={registerFormHandler}>
      Sign Up
    </Button>
    <Toaster />
    <p>Already a User? <Link to={'/login'} className='text-decoration-none'>Sign In</Link></p>
  </Form>
  )
  
}



export default Registerscreen