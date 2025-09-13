import React, { useRef, useState , useContext} from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input"
import { useGoogleLogin } from '@react-oauth/google';
// import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '@/constants/userContext';

const LoginPopup = () => {
    const formRef = useRef(null);
    
    // Acive and Deactive SignIN/SignUp
    const [signInActive,setSignInActive] = useState(true);
    const {opendDailog, setOpenDailog,setUserData } = useContext(UserContext);
    

    //Sign Up - Create New Account
    const handleSignUp =  async(e) => {
        e.preventDefault();
        const target = e.target;

        const newUser = {
            username : target.username.value,
            email : target.email.value,
            password : target.password.value
        }
        if(!newUser.username || !newUser.email || !newUser.password){
            toast.error("All Fields Are Required!!")
            return;
        }
        await axios.post("https://trip-planner-wheat-omega.vercel.app/api/register",newUser, {
            headers : {
                "Content-Type" : "application/json"
            }
        }).then((res) => {
           
            if(res.status === 200){
                toast.success("User Resgitered Successfully!!");
                
                formRef.current.reset();
                setOpenDailog(false)

            }else{
                toast.error("Something Went Wrong!!")
            }

        }).catch((err) => {
             if(err.status === 400){
                return  toast.error(err.response.data.message);
            }
            toast.error(err.message)
        })


    }

    
    
    
    
    const login = useGoogleLogin({
        onSuccess: tokenResponse => GetUserProfile(tokenResponse),
        onError : (error) => console.log(error)
    });
    
    const GetUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept : "Application/json"
            }
        } ).then((resp) => {
            localStorage.setItem("user",JSON.stringify(resp.data));
        })
    }
    
    
    //Sign IN - Login Client
  const handleLogin = async (e) => {
    e.preventDefault();
    let target = e.target;
    const userDetail = {
        email : target.email.value,
        password: target.password.value
    }
    if(!userDetail.email || !userDetail.password){
        toast.error("Username And Password Are Required!!")
        return;
    }
    const userStringy = JSON.stringify(userDetail);
    // cross verify
  
    await axios.post("https://trip-planner-wheat-omega.vercel.app/api/login",userStringy,{headers : {'Content-Type' : 'application/json'}}).then((res) => {
        
        localStorage.setItem("user", JSON.stringify(res.data.user))
        setUserData(res.data.user)
        toast.success("You Are Logged In!!")
        setOpenDailog(false)

    }).catch((err) => {
        if(err.status === 400){
             return  toast.error(err.response.data.message);
        }
          toast.error(err.message);

    })
 
  }

  return (
     <Dialog open={opendDailog}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        
        <DialogContent className="p-0">
            <div className='grid grid-cols-2 text-center font-bold uppercase'>
                <div className={`py-4 border-b-3 ${signInActive && "border-orange-600"}`} onClick={() => setSignInActive(true)}>Sign In</div>
                <div className={`py-4 border-b-3 ${!signInActive && "border-orange-600"}`} onClick={() => setSignInActive(false)}>Sign Up</div>
            </div>
            {/* Sign In */}
            {
                signInActive &&  <DialogHeader className="p-4 px-10">
                <img src='/logo.svg'  className='h-10' />
                
                
                    <form className='space-y-4 py-6' onSubmit={handleLogin} ref={formRef}> 
                        <div>
                            {/* <label>Email</label> */}
                            <Input type="email" placeholder="Email"  className="bg-gray-200" name="email"/>
                        </div>
                         <div>
                            {/* <label>Email</label> */}
                            <Input type="password" placeholder="Password"  className="bg-gray-200" name="password"/>
                        </div>
                        <Button className="w-full">Sign In</Button>
                    </form>
                  <div className='text-2xl text-gray-900 font-bold text-center flex justify-center gap-6 items-center'>
                    <span className='h-1 bg-gray-600 w-10'></span>
                    <span>OR</span>
                    <span className='h-1 bg-gray-600 w-10'></span>
                </div>
                <DialogTitle className='text-2xl text-gray-900 font-bold text-center'>SignIn WIth Google</DialogTitle>
                <DialogDescription className="space-y-2">

                
                    <p className='text-center'>Sign in to the App with Google Authentication screeen</p>

                    <Button className="w-full my-3 flex items-center gap-4"   > <FcGoogle  className='h-7 w-7'/> Sign In With Google</Button>
                </DialogDescription>
            </DialogHeader>
            }


            {/* Sign Up */}
            {
                !signInActive &&  <DialogHeader className="p-4 px-10">
                {/* <img src='/logo.svg'  className='h-10' /> */}
                <DialogTitle className='text-2xl text-gray-900 font-bold text-center'>Create Your Account</DialogTitle>
                    <form className='space-y-4 py-6' onSubmit={handleSignUp} ref={formRef}> 
                        <div>
                            {/* <label>Email</label> */}
                            <Input type="text" placeholder="Username"  className="bg-gray-200" name="username"/>
                        </div>
                        <div>
                            {/* <label>Email</label> */}
                            <Input type="email" placeholder="Email"  className="bg-gray-200" name="email"/>
                        </div>
                         <div>
                            {/* <label>Email</label> */}
                            <Input type="password" placeholder="Password"  className="bg-gray-200" name="password"/>
                        </div>
                        <Button className="w-full">Sign Up</Button>
                    </form>
                  <div className='text-2xl text-gray-900 font-bold text-center flex justify-center gap-6 items-center'>
                    <span className='h-1 bg-gray-600 w-10'></span>
                    <span>OR</span>
                    <span className='h-1 bg-gray-600 w-10'></span>
                </div>
                <DialogTitle className='text-2xl text-gray-900 font-bold text-center'>SignUp With Google</DialogTitle>
                <DialogDescription className="space-y-2">

                
                    <p className='text-center'>Sign Up to the App with Google Authentication screeen</p>

                    <Button className="w-full my-3 flex items-center gap-4"   > <FcGoogle  className='h-7 w-7'/> Sign Up With Google</Button>
                </DialogDescription>
            </DialogHeader>
            }
        </DialogContent>
    </Dialog>
  )
}



export default LoginPopup