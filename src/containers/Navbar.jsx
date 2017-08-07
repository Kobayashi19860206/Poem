import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { showSignUp, showLogin } from 'src/ducks/login.js'
import * as userDuck from 'src/ducks/users'
import PoemistLogo from 'src/components/Logo.jsx'

import './_navbar'

const LogInOut = ({ showSignUp, showLogin }) => (
  <span>
    <a onClick={showSignUp}>Sign Up</a> / <a onClick={showLogin}>Log In</a>
  </span>
)

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isExpanded: false };
  }

  render() {
    const { showLogin, showSignUp, toggleShowSignIn, toggleShowLogin, logoutUser, currentUser } = this.props;
    const { isExpanded } = this.state
    return (
      <div className="header">
        <NavLink to="/" className="logo">
          <PoemistLogo />
        </NavLink>
        <div className="navbar">
          <button className="btn btn-link">
            <i
              className="hamburger fa fa-bars"
              onClick={() => this.setState({ isExpanded: !isExpanded })}
            >
              bars
            </i>
          </button>
          <ul className={isExpanded ? "navbarMenu" : "navbarMenu expanded"}>
            <li>
              <NavLink activeClassName="active" exact to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/new/write">
                Create
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/about">
                About
              </NavLink>
            </li>
            { currentUser &&
              <li>
                <NavLink activeClassName="active" to={`/user/${currentUser.id}`}>Profile</NavLink>
              </li>
            }
            <li>
              { currentUser ?
                <span>
                  Hi {currentUser.username}! <a onClick={logoutUser}>Logout</a>
                </span>
                : <LogInOut showSignUp={showSignUp} showLogin={showLogin} />}
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

Navbar.propTypes = {
  currentUser: React.PropTypes.object,
  toggleShowLogin: React.PropTypes.func,
  logoutUser: React.PropTypes.func,
}

const mapDispatchToProps = {
  showLogin: showLogin,
  showSignUp: showSignUp,
  logoutUser: userDuck.handleLogoutUser,
}

function mapStateToProps(state) {
  return {
    currentUser: userDuck.getCurrentUser(state),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
