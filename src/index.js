import React from 'react';
import ReactDOM from 'react-dom';
import firebase, {auth,provider} from './firebase.js';
import './index.css';
import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Button, Fab, Paper } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';


import * as serviceWorker from './serviceWorker';

class AppRouter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {user: null}
	}
	componentDidMount() {
		auth.onAuthStateChanged(user => {
			if(user){
				this.setState({user});
			}
		})
	}
	logOutUser = () => {
		firebase.auth().signOut().then(window.location = "/");
	}
	render() {
		return (
			<Router>
				<Paper style={{ height: "96vh" }}>
				<div className="app">
					<nav className="main-nav">
						{!this.state.user &&
							<div>
								<Button variant="outlined" color="primary" style={{ margin: '10px 5px' }}><Link to="/login">Login</Link></Button>
								<Button variant="outlined" color="primary" style={{ margin: '10px 5px' }}><Link to="/register">Register</Link></Button>
							</div>
						}
						{this.state.user &&
						<Button variant="outlined" color="primary"><a href="#!" onClick={this.logOutUser}>Log out</a></Button>
						}
					</nav>
					<Switch>
						<Route path="/" exact render={() => <App user={this.state.user}/>} />
						<Route path="/login" exact component={Login} />
						<Route path="/register" exact component={Register} />
					</Switch>
				</div>
			</Paper>
			</Router>
		);
	}
}

ReactDOM.render(<ThemeProvider theme={theme}><AppRouter /></ThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
