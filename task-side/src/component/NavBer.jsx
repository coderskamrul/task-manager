import React from 'react'
import { Link } from 'react-router-dom'

const NavBer = () => {
  return (
    <nav className="navbar">
  <div className="navbar-left">
    <a href="/" className="logo">
      Task Manager
    </a>
  </div>
  <div className="navbar-center">
    <ul className="nav-links">
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/tasks">Tasks</a>
      </li>
      <li>
        <a href="/signin">Sign Up</a>
      </li>
      <li>
        <a href="/login">Log In</a>
      </li>
    </ul>
  </div>
  <div className="navbar-right">
    <a href="/cart" className="cart-icon">
      <i className="fas fa-shopping-cart"></i>
      <span className="cart-count">0</span>
    </a>
    <a href="/account" className="user-icon">
      <i className="fas fa-user"></i>
    </a>
  </div>
</nav>
  )
}

export default NavBer