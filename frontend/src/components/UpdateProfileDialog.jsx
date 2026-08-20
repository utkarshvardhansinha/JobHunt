import { Dialog } from '@radix-ui/react-dialog'
import React, { useState } from 'react'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from '@radix-ui/react-label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { USER_API_ENDPOINT } from '../utils/constant'
import { toast } from 'sonner'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'

function UpdateProfileDialog({ open, setOpen }) {

  const [loading, setLoading] = useState(false);
  const {user} = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullName: user?.fullName,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio || '',
    skills: user?.profile?.skills?.map(skill => skill) || '',
    file: user?.profile?.resume || ''
  })

  const changeEventHandler = (e) => {
    setInput({
      ...input, [e.target.name]: e.target.value})
  }

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({...input, file: file });
    console.log(file);
  }

  const submitHandler = async (e) => {
    e.preventDefault(); 
    const formData = new FormData();
    formData.append('fullName', input.fullName);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('bio', input.bio);
    formData.append('skills', input.skills);
    if (input.file) {
      formData.append('file', input.file);
    }
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/profile/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      })
      if(res.data?.success) {
        dispatch(setUser(res.data.data.user));
        toast.success(res.data.message,'Profile updated successfully');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
    setOpen(false);
    // console.log(input);
  }


  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-[425px]' onInteractOutside={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className='text-right'>Name</Label>
                <Input
                  id='name'
                  name='fullName'
                  type='text'
                  value={input.fullName}
                  onChange={changeEventHandler}
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='email' className='text-right'>Email</Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  value={input.email}
                  onChange={changeEventHandler}
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='number' className='text-right'>Number</Label>
                <Input
                  id='number'
                  name='phoneNumber'
                  type='tel'
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='bio' className='text-right'>Bio</Label>
                <Input
                  id='bio'
                  name='bio'
                  type={'text'}
                  value={input.bio}
                  onChange={changeEventHandler}
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='skills' className='text-right'>Skills</Label>
                <Input
                  id='skills'
                  name='skills'
                  value={input.skills}
                  onChange={changeEventHandler}
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='file' className='text-right'>Resume</Label>
                <Input
                  id='file'
                  name='file'
                  type='file'
                  onChange={fileChangeHandler}
                  accept='application/pdf'
                  className='col-span-3'
                />
              </div>
            </div>
            <DialogFooter>
              {
                loading ? <Button className="w-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait</Button> :
                  <Button type="submit" className="w-full my-4">
                    Update
                  </Button>
              }
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UpdateProfileDialog