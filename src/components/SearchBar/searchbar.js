// import preact
import { h, render, Component } from 'preact';

export default class SearchBar extends Component {

	// rendering a function when the button is clicked
	render() {
		let enterFunction = this.props.enterFunction;
		if(typeof enterFunction !== 'function'){
			enterFunction = () => {
				console.log("passed something as 'enterFunction' that wasn't a function !");
			}
		}
		return (
			<div>
				<input style="height:35px;width:300px;font-size:14pt;text-align:left" type = "text" placeholder = "Enter your city" onKeyDown = {enterFunction}></input>
			</div>
		);
	}
}
