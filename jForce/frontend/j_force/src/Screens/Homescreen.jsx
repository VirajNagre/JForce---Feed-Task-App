import React from 'react'
import { useGetAllPostsQuery } from '../Slices/postsApiSlice'
import {Card,CardHeader,CardSubtitle,Container, Spinner} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Loader from '../Components/Loader'
import formatDateTime from '../utils/dateTimeFormatter.js'

const Homescreen = () => {

  const {data:posts,isLoading,isError} = useGetAllPostsQuery()
  const navigate = useNavigate()
  console.log("posts",posts)

  if (isError){
    console.log("data",posts)
    return( <Loader />)}
    // <>Loading</>
  if (isLoading){
    return(    <Container className='d-flex justify-content-center align-items-center vh-100'>
    <Spinner animation="grow" />
    </Container>)
    // <>Loading</>
  }
  return (
    // <Container className='d-flex gap-1'>
      <Container className='d-flex flex-column gap-2'>
      {posts.map((post)=>
      <Card style={{ flex:1 }}>
        <Card.Body onClick={()=>navigate(`/post/${post._id}`)}>
            <Card.Subtitle className='text-muted '>posted by</Card.Subtitle>
            <Card.Title><strong>{post?.createdBy?.name? post?.createdBy?.name : "John Doe"}</strong></Card.Title>
            <small className='my-2 text-tertiary '>{formatDateTime(post?.createdAt)}</small>
            <Card.Text className='mt-4'>
            {post.content}
            </Card.Text>
            </Card.Body>
      </Card>)}
    </Container>

  )
}

export default Homescreen