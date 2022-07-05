import React from 'react'
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
    <Link to="/watchlist">
      <button>Watchlist</button>
    </Link>
    </div>
  )
}

export default NavBar