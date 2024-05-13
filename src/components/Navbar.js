import React from "react"
import { Link } from "react-router-dom"
import "../styles/Navbar.css"

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">Harmonogram Red Panda</div>
      <div>
        <Link to="/import-schedule">Import</Link>
        <Link to="/">Plan</Link>
      </div>
    </div>
  )
}

export default Navbar
