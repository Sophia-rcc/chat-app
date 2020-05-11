import React from 'react';
import './App.css';
import Chatbox from './components/Chatbox';
import {Link} from 'react-router-dom';
import firebase from './firebase';
import { Button, Typography, Container, TextField, Box } from '@material-ui/core';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: ''
		};
	}

	onChange = (event) => {
		this.setState({[event.target.name]: event.target.value });
	}
	
	onSubmit = (event) => {
		event.preventDefault()
		if(this.state.message !== ''){
			const chatRef = firebase.database().ref('general');
			const chat = {
				message: this.state.message,
				user: this.props.user.displayName,
				timestamp: new Date().getTime()
			}
			
			chatRef.push(chat);
			this.setState({message: ''});
		}
	}

	render() {
	  return (
		 <Container maxWidth="sm" >
		<div className="App">
		  <Typography variant="h1">Chat app</Typography>
		  
		  {this.props.user &&
		  <div className="allow-chat">
		  	<Box style={{ border: '1px solid #939393', borderRadius: '10px', padding: '10px' }}>
		  	<Chatbox />
		  	<form className="message-form" onSubmit={this.onSubmit} style={{display: 'flex', justifyContent: 'space-between' }}>
			<TextField
		  		style={{ width: '85%'}}
		  		multiline variant="outlined"
		  		rowsMax={4}
		  		margin="dense"
		  		name="message"
		  		id="message"
		  		value={this.state.message}
		  		placeholder="Enter a message..."
		  		onChange={this.onChange} />
			<Button variant="contained" color="primary" type="submit" style={{ alignSelf: 'center', }}>Send</Button>
		  	</form>
		  	</Box>
			</div>
		  }
		  {!this.props.user &&
		  <div className="disallow-chat">
		  	<Typography><Link to="/login">Login</Link> or <Link to="/register">Register</Link> to start chatting!</Typography>
		  </div>
		  }
		</div></Container>
	  );
	}
}

export default App;
