// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
// import jquery for API calls
import $ from 'jquery';

//background names
const bg = [
	"rainy",
	"night",
	"sunny",
	"cloudy",
	"snowy"
];


//greetings for homepage
const greetings = [
	"Good Evening",
	"Good Morning",
];

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		this.fetchWeatherData();
		this.fetchHourly(51.5085, -0.1257);
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=a6d681a3dba55941eeb547ea241befa1";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}

	//gets hourly data from openweathermap
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

	//function to deal with the hourly openweather API call
	parseHResponse = (parsed_json) => {
		var HT1 = Math.round(parsed_json['hourly']['1']['temp']);
		var HT2 = Math.round(parsed_json['hourly']['2']['temp']);
		var HT3 = Math.round(parsed_json['hourly']['3']['temp']);
		var HT4 = Math.round(parsed_json['hourly']['4']['temp']);
		var HT5 = Math.round(parsed_json['hourly']['5']['temp']);

		var dtime1 = new Date((parsed_json['daily']['1']['dt'])*1000);
		var dow1 = dtime1.toLocaleString("en-US", {weekday: "short"});

		var dtime2 = new Date((parsed_json['daily']['2']['dt'])*1000);
		var dow2 = dtime2.toLocaleString("en-US", {weekday: "short"});

		var dtime3 = new Date((parsed_json['daily']['3']['dt'])*1000);
		var dow3 = dtime3.toLocaleString("en-US", {weekday: "short"});

		var dtime4 = new Date((parsed_json['daily']['4']['dt'])*1000);
		var dow4 = dtime4.toLocaleString("en-US", {weekday: "short"});

		var dtime5 = new Date((parsed_json['daily']['5']['dt'])*1000);
		var dow5 = dtime5.toLocaleString("en-US", {weekday: "short"});

		var d1max = Math.round(parsed_json['daily']['1']['temp']['max']);
		var d2max = Math.round(parsed_json['daily']['2']['temp']['max']);
		var d3max = Math.round(parsed_json['daily']['3']['temp']['max']);
		var d4max = Math.round(parsed_json['daily']['4']['temp']['max']);
		var d5max = Math.round(parsed_json['daily']['5']['temp']['max']);

		var d1min = Math.round(parsed_json['daily']['1']['temp']['min']);
		var d2min = Math.round(parsed_json['daily']['2']['temp']['min']);
		var d3min = Math.round(parsed_json['daily']['3']['temp']['min']);
		var d4min = Math.round(parsed_json['daily']['4']['temp']['min']);
		var d5min = Math.round(parsed_json['daily']['5']['temp']['min']);

		var di1 = parsed_json['daily']['1']['weather']['0']['icon'];
		var di2 = parsed_json['daily']['2']['weather']['0']['icon'];
		var di3 = parsed_json['daily']['3']['weather']['0']['icon'];
		var di4 = parsed_json['daily']['4']['weather']['0']['icon'];
		var di5 = parsed_json['daily']['5']['weather']['0']['icon'];


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

				d1max : d1max,
				d2max : d2max,
				d3max : d3max,
				d4max : d4max,
				d5max : d5max,

				dtime1 : dtime1,
				dtime2 : dtime2,
				dtime3 : dtime3,
				dtime4 : dtime4,
				dtime5 : dtime5,

				dow1 : dow1,
				dow2 : dow2,
				dow3 : dow3,
				dow4 : dow4,
				dow5 : dow5,

				d1min : d1min,
				d2min : d2min,
				d3min : d3min,
				d4min : d4min,
				d5min : d5min,

				di1 : di1,
				di2 : di2,
				di3 : di3,
				di4 : di4,
				di5 : di5,

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
		console.log(document.getElementById('hour5').src)


		
		document.getElementById('day1').src = 'https://openweathermap.org/img/wn/' + this.state.di1 +'@2x.png';
		console.log(document.getElementById('day1').src);

		document.getElementById('day2').src = 'https://openweathermap.org/img/wn/' + this.state.di2 +'@2x.png';
		console.log(document.getElementById('day2').src);

		document.getElementById('day3').src = 'https://openweathermap.org/img/wn/' + this.state.di3 +'@2x.png';
		console.log(document.getElementById('day3').src);

		document.getElementById('day4').src = 'https://openweathermap.org/img/wn/' + this.state.di4 +'@2x.png';
		console.log(document.getElementById('day4').src);

		document.getElementById('day5').src = 'https://openweathermap.org/img/wn/' + this.state.di5 +'@2x.png';
		console.log(document.getElementById('day5').src);
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
		document.getElementById('down1').src = "../../assets/icons/down1.png";
		document.getElementById('up1').src = "../../assets/icons/up1.png";

		this.fetchHourly(this.state.lat, this.state.lon);
	}

	//checking time of day for greeting
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

	//Choosing the greeting message based on time
	whatGreeting(){
		if (!(this.isDay())){
			return greetings[0];
		}
		else{
			return greetings[1];
		}
	}

	//function for formatting date
	formatDate = (date) => {
		var hours = date.getHours();
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12;
		var strTime = hours + ' ' + ampm;
		return strTime;
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
							<p><img id = 'down1'/> : {this.state.min}° <img id = 'up1'/> : {this.state.max}°</p>
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
					<div class = {style.timeContainer}>
						<p>Air pressure: {this.state.pressure}</p>
						<p>Wind: {this.state.wind}mph</p>
						<p>UV index: {this.state.uv}</p>
						<p>Humidity: {this.state.humidity}</p>
					</div>
					<div class = {style.timeContainer}>
						<div class = {style.time}>
							<p>{this.state.dow1}</p>
							<img id = "day1"/>
							<p>Max:{this.state.d1max}°</p>
							<p>Min:{this.state.d1min}°</p>
						</div>
						<div class = {style.time}>
							<p>{this.state.dow2}</p>
							<img id = "day2"/>
							<p>Max:{this.state.d2max}°</p>
							<p>Min:{this.state.d2min}°</p>	
						</div>
						<div class = {style.time}>
							<p>{this.state.dow3}</p>
							<img id = "day3"/>
							<p>Max:{this.state.d3max}°</p>
							<p>Min:{this.state.d3min}°</p>
						</div>
						<div class = {style.time}>
							<p>{this.state.dow4}</p>
							<img id = "day4"/>
							<p>Max:{this.state.d4max}°</p>
							<p>Min:{this.state.d4min}°</p>
						</div>
						<div class = {style.time}>
							<p>{this.state.dow5}</p>
							<img id = "day5"/>
							<p>Max:{this.state.d5max}°</p>
							<p>Min:{this.state.d5min}°</p>
						</div>
					</div>
					<div class={ style.details }></div>
			</div>
		);
	}
}
