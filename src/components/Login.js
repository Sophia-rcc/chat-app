import React from 'react';
import firebase from '../firebase.js';
import { Link } from 'react-router-dom';
import { TextField, Container, Button, Grid, Typography } from '@material-ui/core';

class Login extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			error: null
		}
	}
	handleChange = e => {
		this.setState({[e.target.name]: e.target.value});
	}
	
	handleSubmit = e => {
		e.preventDefault();
		const {email, password} = this.state;
		firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
			this.props.history.push('/');
		})
		.catch(error => {
			this.setState({error});
		});
	}
	render(){
		const {email, password, error} = this.state;
		return(
			<Container maxWidth="sm">
			<div className="auth-container">
				<Typography variant="h1">Login</Typography>
				<Typography>Login to access your account</Typography>
				{error && <Typography color="error" className="error-message">{error.message}</Typography>}
				<form onSubmit={this.handleSubmit}>
				<Grid container spacing={1}>
					<Grid item xs={12}>
					<TextField
					 variant="outlined"
					 margin="dense"
					 label="Email address"
					 type="text"
					 name="email"
					 id="email"
					 value={email}
					 onChange={this.handleChange}
					/>
					</Grid>
					<Grid item xs={12}>
					<TextField
					 variant="outlined"
					 margin="dense"
					 label="Password"
					 type="password"
					 name="password"
					 id="password"
					 value={password}
					 onChange={this.handleChange}
					/>
					</Grid>
					<Grid item xs={3}>
					<Button className="submit" type="submit" variant="contained" color="primary">Login</Button>
					</Grid>
					<Grid item xs={10}>
					<Typography>Don't have an account? <Link className="login-btn" to="/register">Register here</Link></Typography>
					</Grid>
				</Grid>
				</form>
			</div>
			</Container>
		);
	}
}

export default Login;