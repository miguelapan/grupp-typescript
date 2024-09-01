import React from "react"
import NavLink from "./ui/Link"

const Navbar: React.FC = () => {
  return (
    <nav>
        <ul>
          <li>
           <NavLink to={'/'} linkText="HOME"/> 
            </li>
          <li>
            <NavLink to={'/help'} linkText="HELP"/>
            </li>
        </ul>
      </nav>
  )
}

export default Navbar