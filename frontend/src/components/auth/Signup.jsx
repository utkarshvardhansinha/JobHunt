import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Shared/Navbar'
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { RadioGroup } from "../ui/radio-group"
import { Button } from '../ui/button'
import {Link} from "react-router-dom"
import axios from 'axios'
import { USER_API_ENDPOINT } from '../../utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from "react-redux"
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'


function Signup() {
  const [inputValue, setInputValue] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "student",
    file: ""
  })
  const Navigate = useNavigate();
  const {loading} = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  

  const changeEventHandler = (e) => {
    setInputValue({...inputValue, [e.target.name]: e.target.value });
  }
  
  const changeEventHandlerFile = (e) => {
    setInputValue({...inputValue, file: e.target.files?.[0] });
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("fullName", inputValue.fullName);
    formData.append("email", inputValue.email);
    formData.append("password", inputValue.password);
    formData.append("phoneNumber", inputValue.phoneNumber);
    formData.append("role", inputValue.role);
    if(inputValue.file){
      formData.append("file", inputValue.file);
    }
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers : {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      })

      if(res.data?.success) {
        Navigate("/login");
        toast.success("Signup successfully");
      }
      
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error(error.response?.data?.message || "Signup failed");
    }finally{
      dispatch(setLoading(false))
    }
  }

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form  onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
          <div className='my-2'>
            <Label className='my-2'>Full Name</Label>
            <Input
              type="text"
              value = {inputValue.fullName}
              name= "fullName"
              onChange = {changeEventHandler}
              placeholder="Whats your name"
            />
          </div>
          <div className='my-2'>
            <Label className='my-2'>Email</Label>
            <Input
              type="email"
              value = {inputValue.email}
              name= "email"
              onChange = {changeEventHandler}
              placeholder="@gmail.com"
            />
          </div>
          <div className='my-2'>
            <Label className='my-2'>Phone Number</Label>
            <Input
              type="Number"
              value = {inputValue.phoneNumber}
              name= "phoneNumber"
              onChange = {changeEventHandler}
              placeholder="0000000000"
            />
          </div>
          <div className='my-2'>
            <Label className='my-2'>Password</Label>
            <Input
              type="password"
              value = {inputValue.password}
              name= "password"
              onChange = {changeEventHandler}
              placeholder="Enter the password"
            />
          </div>
          <div className='flex items-center justify-between'>
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked = {inputValue.role === "student"}
                  onChange= {changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked = {inputValue.role === "recruiter"}
                  onChange= {changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className='flex items-center gap-2'>
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange= {changeEventHandlerFile}
                className="cursor-pointer"
              />
            </div>
          </div>
          {
            loading ? <Button className= "w-full my-4"> <Loader2 className = "mr-2 h-4 w-4 animate-spin"/>Please wait</Button> :
            <Button type= "submit" className="w-full my-4">
              Signup
            </Button>
          }
          <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
        </form>
      </div>
    </div>

  )
}

export default Signup