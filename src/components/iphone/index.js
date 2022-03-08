// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';


const bg = [
	"rainy",
	"night",
	"sunny",
	"cloudy",
	"snowy"
];

const greetings = [
	"Good Evening",
	"Good Morning"
];



export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.fetchWeatherData();
		this.fetchHourly(51.5085, -0.1257);
	}

	formatDate = (date) => {
		var hours = date.getHours();
		var ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours ? hours : 12;
		var strTime = hours + ' ' + ampm;
		return strTime;
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=fe32d7527ce0cb77ed6216e849f63148";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
	}

	fetchWeatherData2(query){
		if(event.key === 'Enter'){
			var a = "http://api.openweathermap.org/data/2.5/weather?q="
			var b = "&units=metric&APPID=fe32d7527ce0cb77ed6216e849f63148";
			$.ajax({
				url: a + query + b,
				dataType: "jsonp",
				success : this.parseResponse,
				error : function(req, err){ console.log('API call failed ' + err); }
			})

		}
	}

	fetchHourly(latitude, longitude){
		var url = "http://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=current,minutely,alerts&units=Metric&appid=fe32d7527ce0cb77ed6216e849f63148";

		$.ajax({
			url: url,
			dataType: "json",
			success : this.parseHResponse,
			async: true,
			error : function(req, err){ console.log('API call failed ' + err + ', ' + APIKEY); }
		})
	}





	isDay() {
		if (!!this.state.timezone){
			var utc = Date.now() + (new Date().getTimezoneOffset()*60000) + (1000 * this.state.timezone);
			var fullDate = new Date(utc);
			var hour = fullDate.getHours();
			return (hour > 5 && hour < 17);
		} else {
			var utc = Date.now() + (new Date().getTimezoneOffset()*60000) + (1000 );
			var fullDate = new Date(utc);
			var hour = fullDate.getHours();
			return (hour > 5 && hour < 17);
		}
	}

	whatGreeting(){
		if (!(this.isDay())){
			return greetings[0];
		}
		else{
			return greetings[1];
		}
	}

	pickBackground() {
		if (!(this.isDay())){
			return bg[1];
		}
		else if (this.state.cond.includes("rain") || this.state.cond.includes("drizzle")){
			return bg[0]
		}
		else if (this.state.cond.includes("snow")){
			return bg[4]
		}
		else if (this.state.cond.includes("sun") || this.state.cond.includes("clear")){
			return bg[2]
		}
		else if (this.state.cond.includes("cloud")){
			return bg[3]
		}
	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;

		// display all weather data
		return (


			<div class={ style.container } id = "background">
					<input type = "text" class = "search-bar" placeholder = "Enter your city" onKeyDown = {e => this.fetchWeatherData2(e.target.value)}></input>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class= { style.greetings }>
						<h1>{this.whatGreeting()}</h1>
						<h2>Current conditions are {this.state.cond}</h2>
					</div>
					<div class={style.city}>
						<img id = 'IMG'/>
					</div>
					<div class={ style.header }>
						<span class={ tempStyles }>{ this.state.temp }</span>
						<div class={ style.details}>
							<p>Min: {this.state.min}° Max: {this.state.max}°</p>
						</div>
					</div>
					<div class = {style.timeContainer}>
						<div class = {style.time}>
							<p>{this.state.time1}</p>
							<img id = "hour1"/>
							<p>{this.state.HT1}°</p>
						</div>
						<div class = {style.time}>
							<p>{this.state.time2}</p>
							<img id = "hour2"/>
							<p>{this.state.HT2}°</p>
						</div>
						<div class = {style.time}>
							<p>{this.state.time3}</p>
							<img id = "hour3"/>
							<p>{this.state.HT3}°</p>
						</div>
						<div class = {style.time}>
							<p>{this.state.time4}</p>
							<img id = "hour4"/>
							<p>{this.state.HT4}°</p>
						</div>
						<div class = {style.time}>
							<p>{this.state.time5}</p>
							<img id = "hour5"/>
							<p>{this.state.HT5}°</p>
						</div>
					</div>
					<div class={ style.details }></div>
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		var location = parsed_json['name'];
		var temp_c = Math.round(parsed_json['main']['temp']);
		var conditions = parsed_json['weather']['0']['description'];
		var icon = parsed_json['weather']['0']['icon'];
		var max = Math.round(parsed_json['main']['temp_max']);
		var min = Math.round(parsed_json['main']['temp_min']);
		var timezone = parsed_json['timezone'];
		var latitude = parsed_json["coord"]["lat"];
		var longitude = parsed_json["coord"]["lon"];


		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond: conditions,
			image: icon,
			max: max,
			min: min,
			timezone : timezone,
			lat : latitude,
			lon : longitude
		});
		document.getElementById('IMG').src = 'https://openweathermap.org/img/wn/' + this.state.image +'@2x.png';
		console.log(document.getElementById('IMG').src);
		document.getElementById('background').style.backgroundImage =  "url(../../assets/backgrounds/" + this.pickBackground() + ".jpg)";

		this.fetchHourly(this.state.lat, this.state.lon);
	}

	parseHResponse = (parsed_json) => {
		var HT1 = Math.round(parsed_json['hourly']['1']['temp']);
		var HT2 = Math.round(parsed_json['hourly']['2']['temp']);
		var HT3 = Math.round(parsed_json['hourly']['3']['temp']);
		var HT4 = Math.round(parsed_json['hourly']['4']['temp']);
		var HT5 = Math.round(parsed_json['hourly']['5']['temp']);

		var icon1 = parsed_json['hourly']['1']['weather']['0']['icon'];
		var icon2 = parsed_json['hourly']['2']['weather']['0']['icon'];
		var icon3 = parsed_json['hourly']['3']['weather']['0']['icon'];
		var icon4 = parsed_json['hourly']['4']['weather']['0']['icon'];
		var icon5 = parsed_json['hourly']['5']['weather']['0']['icon'];

		var time1 = this.formatDate(new Date((parsed_json['hourly']['1']['dt']+this.state.timezone) * 1000));
		var time2 = this.formatDate(new Date((parsed_json['hourly']['2']['dt']+this.state.timezone) * 1000));
		var time3 = this.formatDate(new Date((parsed_json['hourly']['3']['dt']+this.state.timezone) * 1000));
		var time4 = this.formatDate(new Date((parsed_json['hourly']['4']['dt']+this.state.timezone) * 1000));
		var time5 = this.formatDate(new Date((parsed_json['hourly']['5']['dt']+this.state.timezone) * 1000));

		var wind = parsed_json['hourly']['0']['wind_speed'];
		var pressure = parsed_json['hourly']['0']['pressure'];
		var humidity = parsed_json['hourly']['0']['humidity'];
		var uv = parsed_json['hourly']['0']['uvi'];


		// set states for fields so they could be rendered later on
		this.setState({
				HT1 : HT1,
				HT2 : HT2,
				HT3 : HT3,
				HT4 : HT4,
				HT5 : HT5,

				icon1  : icon1,
				icon2  : icon2,
				icon3  : icon3,
				icon4  : icon4,
				icon5  : icon5,

				time1 : time1,
				time2 : time2,
				time3 : time3,
				time4 : time4,
				time5 : time5,

				wind: wind,
				pressure : pressure,
				humidity : humidity,
				uv : uv

		});
		document.getElementById('hour1').src = 'https://openweathermap.org/img/wn/' + this.state.icon1 +'@2x.png';
		console.log(document.getElementById('hour1').src);

		document.getElementById('hour2').src = 'https://openweathermap.org/img/wn/' + this.state.icon2 +'@2x.png';
		console.log(document.getElementById('hour2').src);

		document.getElementById('hour3').src = 'https://openweathermap.org/img/wn/' + this.state.icon3 +'@2x.png';
		console.log(document.getElementById('hour3').src);

		document.getElementById('hour4').src = 'https://openweathermap.org/img/wn/' + this.state.icon4 +'@2x.png';
		console.log(document.getElementById('hour4').src);

		document.getElementById('hour5').src = 'https://openweathermap.org/img/wn/' + this.state.icon5 +'@2x.png';
		console.log(document.getElementById('hour5').src);
  }


}
