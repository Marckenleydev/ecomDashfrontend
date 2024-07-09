import { Box, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar';
import Navbar from '../components/Navbar';
import { userAPI } from '../service/UserService';




const Layout = () => {

    const isNonMobile:boolean = useMediaQuery("(min-width: 600px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

      const userId = "63701cc1f0323986f3000127";
      const {data} = userAPI.useFetchUserQuery(userId)



  return (
    <Box display={isNonMobile ? "flex": "block"} width="100%" height="100%">
        <SideBar
        user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        />
        <Box flexGrow={1}>
            <Navbar
                    user={data || {}}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}/>
            <Outlet/>
        </Box>
    </Box>
  )
}

export default Layout