import React, { useEffect } from 'react'
import {useViewPostQuery,useApprovePostMutation,useRejectPostMutation} from '../Slices/postsApiSlice';
import { useParams } from 'react-router-dom';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { Button, Card, Container, Spinner } from 'react-bootstrap';
import formatDateTime from '../utils/dateTimeFormatter.js'
import Loader from '../Components/Loader.jsx';

import { UseDispatch } from 'react-redux';

const PostViewScreen = () => {
    const {id} = useParams()

    const dispatch = useDispatch()

    const userInfo = useSelector((state)=>state.auth).userInfo

    const {data:postData,isLoading,isError}  = useViewPostQuery(id)
    
    const [approvePost, { isLoading: isApproving }] =      useApprovePostMutation();
    const [rejectPost, { isLoading: isRejecting }] =   useRejectPostMutation();
    
    // const isOwner = (userInfo?.email === postData?.createdBy.email)
    // console.log(userInfo?.email,postData?.createdBy.email)
    
    if(isLoading){
        return(
            <Loader />
            )
        }
    if (postData){    
        const rejectPostHandler = async (e)=>{
            console.log("rejectPost")
            const rejectResp = await rejectPost(postData._id)
            console.log(rejectResp)
        }
        const approvePostHandler = async (e)=>{
            console.log("approvePost")
            const approveResp = await approvePost(postData._id)
            console.log(approvePost)
        }

        const isOwner = postData?.createdBy?.email ? (userInfo?.email === postData?.createdBy.email) : (userInfo.isAdmin)


return (
    <Card className='p-4'>
        <Card.Title className='mb-5'>{postData?.content}</Card.Title>
        <div className='d-flex gap-5'>
        <div>by- <Card.Subtitle  className='my-2 text-tertiary '>{isOwner?"You":(postData?.createdBy?.name || "John Doe")}</Card.Subtitle></div>
        <div>on <Card.Subtitle  className='my-2 text-tertiary '>{formatDateTime(postData?.createdAt)}</Card.Subtitle></div>
        </div>

        {/* {(!postData.approved && userInfo.isAdmin ) && <div><Button>Approve</Button><Button>Reject</Button></div>} */}
        {userInfo.isAdmin && (
            <div>
              {!postData.approved && <Button onClick={approvePostHandler} variant='success' className='mx-2 my-4'>Approve</Button>}
              <Button variant='warning' onClick={rejectPostHandler}>Reject</Button>
            </div>
        )}
    </Card>
  )
}
}

export default PostViewScreen