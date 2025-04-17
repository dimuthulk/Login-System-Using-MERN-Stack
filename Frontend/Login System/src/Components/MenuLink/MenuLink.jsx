import React from 'react'
import { Link } from "react-router";
import './MenuLink.css'

function MenuLink(props) {
  return (
    <>
    <Link to={props.url} className='link'>{props.linkname}</Link>
    </>
  )
}

export default MenuLink