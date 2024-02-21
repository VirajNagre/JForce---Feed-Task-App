import React from 'react'
import {Container, Spinner} from 'react-bootstrap'

const Loader = () => {
  return (
    <Container className='d-flex justify-content-center align-items-center vh-100'>
    <Spinner />
    </Container>
    )

}

export default Loader