import React, { useContext  } from 'react'
import { Button } from '../ui/button'
import LoginPopup from './LoginPopup'
import { Link } from 'react-router-dom';
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import toast from 'react-hot-toast';
import { UserContext } from '@/constants/userContext';

function Header() {
  const { userData, setUserData,setOpenDailog } = useContext(UserContext);
 

  const logout = () =>{
    localStorage.removeItem("user");
    toast.success("User Logout Successfull!!")
    setUserData(null)
  }
  return (
    <>
    <LoginPopup  />
    <header className='p-4 md:px-30 lg:px-56 shadow-sm flex justify-between items-center'>
        <Link to="/"><img src='../logo.svg' alt='' className='h-10' /></Link>

        <nav>
           {
            userData ? 
           <DropdownMenu.Root>
                {/* Trigger button */}
                <DropdownMenu.Trigger className="px-4 py-2 bg-black/90 text-white font-bold rounded capitalize cursor-pointer">
                  {userData?.username}
                </DropdownMenu.Trigger>

                {/* Dropdown content */}
                <DropdownMenu.Content
                  className="bg-white rounded-md shadow-md p-2 min-w-[150px]"
                  sideOffset={5}
                >
                  <DropdownMenu.Item className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer">
                    Profile
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer">
                    Settings
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator className="h-[1px] bg-gray-200 my-1" />
                  <DropdownMenu.Item className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer" onClick={() =>logout() }>
                    Logout
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
            : 
            <Button onClick={() => setOpenDailog(true)}>Sign In</Button> 
           }
        </nav>
    </header>
    </>
  
  )
}

export default Header