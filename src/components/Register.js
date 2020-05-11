import React from 'react';
import firebase from '../firebase.js';
import { Link } from 'react-router-dom';
import { TextField, Container, Button, Grid, Typography } from '@material-ui/core';

class Register extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username: '',
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
		const {email, username, password} = this.state;
		firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
			const user = firebase.auth().currentUser;
			user.updateProfile({displayName: username}).then(() => {
				this.props.history.push('/');
			})
			.catch(error => {
				this.setState({error});
			});
		})
		.catch(error => {
			this.setState({error});
		})
	}
	render(){
		const {email, username, password, error} = this.state;
		return(
			<Container maxWidth="sm">
			<div className="auth-container">
				<Typography variant="h1">Register your account!</Typography>
				{error && <Typography color="error" className="error-message">{error.message}</Typography>}
				<form onSubmit={this.handleSubmit}>
				<Grid container spacing={1}>
					<Grid item xs={12}>
					<TextField
					variant="outlined"
					margin="dense"
					label="Username"
					type="text"
					name="username"
					id="username"
					value={username}
					onChange={this.handleChange}
					/>
					</Grid>
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
					<Button variant="contained" color="primary" type="submit" className="submit">Get started</Button>
					</Grid>
					<Grid item xs={10}>
					<Typography>Already have an account? <Link className="login-btn" to="/login">Login here</Link></Typography>
					</Grid>
				</Grid>
				</form>
			</div>
			</Container>
		);
	}
}

export default Register;