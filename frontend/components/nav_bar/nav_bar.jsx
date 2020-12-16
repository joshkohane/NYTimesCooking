import React from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            className: 'recipe-box-text',
            inputValue: '',
            redirect: false,
        }
        this.getShow = this.getShow.bind(this);
        this.hideShow = this.hideShow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.toggleClass = this.toggleClass.bind(this);
    }

    getShow(e) {
        e.preventDefault();
        this.setState({show: true})
    }

    hideShow(e) {
        e.preventDefault();
        this.setState({ show: false })
        this.props.clearSearch();
        this.setState({inputValue: ''});
    }

    handleChange(e) {
        let input = e.target.value;
        this.setState({inputValue: input})
        if (input === '') {
            this.props.clearSearch();
        } else {
            Object.values(this.props.search(input));
        }
    }

    handleSubmit(e) {
        // e.preventDefault();
        // this.hideShow();
        // debugger;
        // let result = !this.state.redirect
        this.props.history.push(`/api/search/${this.state.inputValue}`)
        this.setState({inputValue: ""})
        this.props.clearSearch();
        // this.setState({ redirect: result });
        // debugger;
    }

    // toggleClass() {
    //     let newClass = this.state.className === 'recipe-box-text' ? "recipe-box-show" : "recipe-box-text"
    //     this.setState({className: newClass})
    // }

    render() {
        const { currentUser, logout, loggedIn, searches } = this.props;
        // <Redirect to="/recipes/all"></Redirect>
        // if (this.state.redirect) {
        //     <Redirect to="/recipes/all"></Redirect> 
        // } 
        // debugger;
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
                    <form className="search-form" onSubmit={this.handleSubmit} >
                        <input onClick={this.getShow} onChange={this.handleChange} value={this.state.inputValue} type="text" className="search-input" placeholder="What would you like to cook?" />
                    </form>
                    <i onClick={this.hideShow} className={this.state.show ? "fas fa-times-circle" : ''}></i>
                    {!searches || location.hash.includes('search') ? 
                        '' :
                        <ul className="search-results" >
                            {Object.values(searches).map((recipe, idx) => (
                                <li key={idx} className="search-results-wrapper" >
                                    <Link className="search-results-child" to={`/api/recipes/${recipe.id}`} style={{ textDecoration: 'none', height: '0px' }} key={idx} >
                                        {/* <p className="search-results-child" > */}
                                        {recipe.title}
                                        {/* </p> */}
                                    </Link>
                                </li>
                            )
                            )}
                        </ul>
                    }
                </div>
                <div className="nav-bar-end">
                    <div className="recipe-box" onClick={loggedIn ? () => {} : () => this.props.openModal('login')} >
                        <div className="recipe-spacer"></div>
                        {loggedIn ? 
                            <Link to={`/api/user/${currentUser}/recipeBox`} style={{ textDecoration: 'none' }}>
                                {/* <p className={location.hash.includes('recipeBox') ? "recipe-box-show" : "recipe-box-text"} >Your Recipe Box</p> */}
                                <p className="recipe-box-text" >Your Recipe Box</p>
                                {/* <p className={this.state.className} onClick={this.toggleClass} >Your Recipe Box</p> */}
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
                                <button className="nav-bar-dropdown-show" onClick={logout}>Log Out</button> :
                                <button className="nav-bar-dropdown-show" onClick={() => this.props.openModal('login')}>Log In</button>
                            }
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(NavBar);