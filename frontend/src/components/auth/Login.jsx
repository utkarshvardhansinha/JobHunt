import React,{useState} from 'react'
import Navbar from '../Shared/Navbar'
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { RadioGroup } from "../ui/radio-group"
import { Button } from '../ui/button'
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import { USER_API_ENDPOINT } from '../../utils/constant'
import {toast} from "sonner"
import {useDispatch, useSelector} from "react-redux"
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'


function Login() {
  const [inputValue, setInputValue] = useState({
      email: "",
      password: "",
      role: "student",
    })
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const {loading} = useSelector((state) => state.auth)
  
    const changeEventHandler = (e) => {
      setInputValue({...inputValue, [e.target.name]: e.target.value });
    }
    const submitEventHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, inputValue, {
        headers : {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      if(res.data?.success) {
        dispatch(setUser(res.data.data.user))
        Navigate("/");
        toast.success("login successfully");
      }
      
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error(error.response?.data?.message || "Login failed");
    }finally {
      dispatch(setLoading(false))
    }
  }


  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitEventHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Login</h1>
          <div className='my-2'>
            <Label className="my-2">Email</Label>
            <Input
              type="email"
              value = {inputValue.email}
              name= "email"
              onChange = {changeEventHandler}
              placeholder="@gmail.com"
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
          </div>
          {
            loading ? <Button className= "w-full my-4"> <Loader2 className = "mr-2 h-4 w-4 animate-spin"/>Please wait</Button> :
            <Button type= "submit" className="w-full my-4">
              Login
            </Button>
          }
          <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
        </form>
      </div>
    </div>

  )
}

export default Login