import React from 'react'
import { Link } from 'react-router-dom'

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h2>Welcome Home!</h2>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </React.Fragment>
    )
  }
}

export default Home