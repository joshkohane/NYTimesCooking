import React from 'react';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            show: true
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.login(this.state);
    }

    handleChange(type) {
        return (e) => {
            this.setState({[type]: e.target.value})
        }
    }

    toggleShow(e) {
        e.preventDefault();
        let newSetting = !this.state.show
        this.setState({show: newSetting})
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Log in to NJT Cooking</h1>
                <label>Email Address
                    <input 
                        type="text"
                        value={this.state.email}
                        onChange={this.handleChange('email')}/>
                </label>
                <label>Password
                    <input
                        type={this.state.show ? "password" : "text"}
                        value={this.state.password}
                        onChange={this.handleChange('password')} />
                    <button onClick={this.toggleShow}>{this.state.show ? "Show" : "Hide" }</button>
                    <p>{this.props.errors.session.join('')}</p>
                </label>
                <input type="submit" value="Log In" />
                <p>Don't have a Times account?</p>
                <Link to='/signup'>Create one</Link>
            </form>
        )
    }
}

export default LoginForm;