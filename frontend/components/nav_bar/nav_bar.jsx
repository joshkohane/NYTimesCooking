import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
        this.getShow = this.getShow.bind(this);
        this.hideShow = this.hideShow.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    getShow(e) {
        e.preventDefault();
        this.setState({show: true})
    }

    hideShow(e) {
        e.preventDefault();
        this.setState({ show: false })
    }

    handleLogout() {
        this.props.logout();
        // this.forceUpdate();
    }

    render() {
        const { currentUser, logout, loggedIn } = this.props;
        return (
            <div className="nav-bar-container">
                <Link to="/" style={{ textDecoration: 'none' }} >
                    <div className="main-logo">
                        <img className="logo-left" src={window.njIMG} alt="The NJTimesCooking Logo" />
                        <p className="logo-right" >Cooking</p>
                        {/* <img className="logo-right" src={window.logoIMG} alt="The NJTimesCooking Logo" /> */}
                    </div>
                </Link>
                <div className="nav-bar-search" >
                    <i className="fas fa-search"></i>
                    <form className="search-form" >
                        <input onClick={this.getShow} type="text" className="search-input" placeholder="What would you like to cook?" />
                    </form>
                    <i onClick={this.hideShow} className={this.state.show ? "fas fa-times-circle" : ''}></i>
                </div>
                <div className="nav-bar-end">
                    <div className="recipe-box" onClick={loggedIn ? () => {} : () => this.props.openModal('login')} >
                        <div className="recipe-spacer"></div>
                        {loggedIn ? 
                            <Link to={`/api/user/${currentUser}/recipeBox`} style={{ textDecoration: 'none' }}>
                                <p className="recipe-box-text" >Your Recipe Box</p>
                            </Link>
                        :
                            <div className="recipe-box-login-container" >
                                <p className="recipe-box-text" >Your Recipe Box</p>
                                <div className="recipe-box-login" >Log In</div>
                            </div>
                        }
                    </div>
                    <div className="nav-bar-dropdown">
                            <i className="fas fa-cog"></i>
                            <div className="nav-bar-dropdown-spacer" ></div>
                            {currentUser ? 
                                <button className="nav-bar-dropdown-show" onClick={this.handleLogout}>Log Out</button> :
                                <button className="nav-bar-dropdown-show" onClick={() => this.props.openModal('login')}>Log In</button>
                            }
                    </div>
                </div>
            </div>
        )
    }
}

export default NavBar