import Footer from "./components/website/Footer";
import Header from "./components/website/Header"
import { Outlet } from 'react-router-dom';
import { UserContext } from "./constants/userContext";
import { useState,useEffect } from "react";

const userStorage = JSON.parse(localStorage.getItem("user"))

function App() {
  const [opendDailog,setOpenDailog] = useState(false);
  const [userData,setUserData] = useState(null)
  useEffect(() => {
      userStorage ? setUserData(userStorage) : setUserData(null) ;
  },[userData])
  return (
    <>
    <UserContext.Provider  value={{opendDailog,setOpenDailog, userData, setUserData}}>
      <Header />
      <div className="min-h-[80vh]">
      <Outlet />

      </div>
      <Footer/>
     </UserContext.Provider>
    </>
  )
}

export default App
