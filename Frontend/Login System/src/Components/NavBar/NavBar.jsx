import React from 'react'
import './NavBar.css'
import MenuLink from '../MenuLink/MenuLink'

function NavBar() {
  return (
    <div className='navbar'>
        <h1>Login System</h1>
        <nav>
        <MenuLink url='/' linkname='Home' />
        <MenuLink url='/signin' linkname='Sign In'/>
        <MenuLink url='/signup' linkname='Sign Up'/>
        </nav>
    </div>
  )
}

export default NavBar