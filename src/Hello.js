import React from 'react';

class Hello extends React.Component {
	render() {
		return (
		<div>
			<p>Hello and welcome to you first component, {this.props.name}</p>
			<p>Today the weather is {this.props.weather}!</p>
		</div>
		);
	}
}
export default Hello;