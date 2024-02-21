import React,{useEffect, useState} from 'react'
import { useGetAdminAllPostsQuery } from '../../Slices/postsApiSlice.js'
import { useNavigate } from 'react-router-dom'
import { Container,Spinner,Card,Tab,Tabs } from 'react-bootstrap'
import Loader from '../../Components/Loader'
import formatDateTime from '../../utils/dateTimeFormatter.js'

const Homescreen = () => {

const {data:posts,isLoading,isError} = useGetAdminAllPostsQuery()

const [approvedPosts,setApprovedPosts] = useState([])
const [rejectedPosts,setRejectedPosts] = useState([])
const [pendingForApproval,setPendingForApproval] = useState([])

const navigate = useNavigate()
console.log("posts",posts) 

useEffect(() => {
  if (posts) {
    console.log("filtering")
    const filteredApprovedPosts = posts.filter(post => (post.approved && !post.rejected));
    const filteredRejectedPosts = posts.filter(post => post.rejected);
    console.log("filteredRejectedPosts",filteredRejectedPosts)
    const filteredPendingForApprovalPosts = posts.filter(post => (post.rejected===false && post.approved===false));
    setApprovedPosts(filteredApprovedPosts);
    setRejectedPosts(filteredRejectedPosts);
    setPendingForApproval(filteredPendingForApprovalPosts);

    console.log("approvedPosts",approvedPosts)
    console.log("rejectedPosts",rejectedPosts)
    console.log("pendingForApproval",pendingForApproval)
  }
}, [posts]);

if (isError || isLoading) {
  return (<Loader />);
}

return (
    <Container className='d-flex flex-column gap-2'>
    <Tabs
    defaultActiveKey="approved"
    id="post category"
    className="mb-3"
  >
    <Tab eventKey="approved" title="Approved">
    {approvedPosts.map((post)=>
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
    </Tab>


    <Tab eventKey="rejected" title="Rejected">
    {rejectedPosts.map((post)=>
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
    </Tab>


    <Tab eventKey="pending" title="Pending">
    {pendingForApproval.map((post)=>
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
    </Tab>

  </Tabs>

  </Container>

)
}


export default Homescreen