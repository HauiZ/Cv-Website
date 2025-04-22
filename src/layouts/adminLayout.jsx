import React from 'react'
import { Outlet } from 'react-router-dom'
import SideMenu from '../pages/Admin/SideMenu'
export default function adminLayout() {
  return (
    <div className='flex min-h-screen'> 
      <SideMenu/>
      <Outlet/>
    </div>
  )
}
