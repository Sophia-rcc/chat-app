import React from 'react';
import firebase from '../firebase';
import { Typography } from '@material-ui/core';


class Chatbox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			chats: []
		}
		
	}
	componentDidMount(){
		const chatRef = firebase.database().ref('general');
		chatRef.on('value', snapshot => {
			const getChats = snapshot.val();
			let ascChats = [];
			for(let chat in getChats){
				if(getChats[chat].message !== ''){
					ascChats.push({
						id: chat,
						message: getChats[chat].message,
						user: getChats[chat].user,
						date: getChats[chat].timestamp
					});
				}
			}
			const chats= ascChats;
			this.setState({chats});
		});
	}
	
	
	render() {
		return(
			<div className="chatbox">
			<ul className="chat-list">
					{this.state.chats.map(chat => {
						const postDate = new Date(chat.date);
						return(
							<li key={chat.id} style={{listStyleType: 'none', marginTop: '10px' }}>
								<Typography><em style={{color: '#939393', fontSize: '0.75rem'}}>{postDate.getDate() + '/' + (postDate.getMonth()+1)}</em>
								<strong style={{color: '#df7caf'}}> {chat.user}: </strong> {chat.message}</Typography>
							</li>
						)
					})}
				</ul>
			</div>
		);
	}
}

export default Chatbox;