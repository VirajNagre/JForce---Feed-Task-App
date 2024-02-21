import React from 'react'
import {Button, Form, Toast} from 'react-bootstrap';
import { useState } from 'react';
import {useCreateNewPostMutation} from '../Slices/postsApiSlice'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const CreateNewPostScreen = () => {
    const [content,setfeed]= useState("")

    const [createNewPost,{isError}] = useCreateNewPostMutation()

    // const [login, { isLoading }] = useLoginMutation();

    const submitFeedHandler = async (e) =>{
        e.preventDefault()
        // alert("kahhbdakjsbnd")
        console.log(content)
        try {
            const res = await createNewPost({content})
            setfeed('');
            console.log(res)
            toast.success("Hurray")
        } catch (error) {
            console.log(error)            
            
        }

    }
    
    return (
        <Form>
            <Form.Group>
                <Form.Label>Content</Form.Label>
                <textarea class="form-control" id="newPost" rows="7" placeholder="Share your thoughts" value={content} onChange={(e)=>setfeed(e.target.value)}></textarea>
                <Button type="submit" onClick={submitFeedHandler}  className='my-5'>Let the world know!!</Button>
            </Form.Group>
            <Toaster />
        </Form>
  )
}

export default CreateNewPostScreen