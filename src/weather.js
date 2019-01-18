import React from "react";
import "./weather.css";
import Geocode from "react-geocode";

function Footer() {
    return (
        <div id="footer-wrapper">
            <div id="footer">
                Thank you to Icons8 for the free weather icons <a href="https://icons8.com/">Icons8</a>
            </div>
        </div>
    )
}


function DisplayWeather(props) {
    const image = getImageForWeather(props.currently.icon);
    const dateString = new Date().toString();
    return (
        <div>
            <div>
                <br />
                {props.place}, on {dateString} <br />
                Temperature: {fToC(props.currently.temperature)}°C ({props.currently.temperature}°F)<br />
                Feels like: {fToC(props.currently.apparentTemperature)}°C ({props.currently.apparentTemperature}°F)<br />
                {<img src={image}></img>}
            </div>
            <Footer />
        </div>
    )
}

function getImageForWeather(icon) {
    switch (icon) {
        case "clear-night":
            return "https://img.icons8.com/ios/50/000000/bright-moon.png";
        case "rain":
            return "https://img.icons8.com/ios/50/000000/rainy-weather.png";
        case "snow":
            return "https://img.icons8.com/ios/50/000000/snow.png";
        case "sleet":
            return "https://img.icons8.com/ios/50/000000/winter.png";
        case "wind":
            return "https://img.icons8.com/ios/50/000000/windy-weather.png";
        case "fog":
        case "cloudy":
            return "https://img.icons8.com/ios/50/000000/cloud.png"
        case "partly-cloudy-day":
            return "https://img.icons8.com/ios/50/000000/partly-cloudy-day.png";
        case "partly-cloudy-night":
            return "https://img.icons8.com/ios/50/000000/partly-cloudy-night.png";
        case "hail":
            return "https://img.icons8.com/ios/50/000000/hail.png";
        case "thunderstorm":
            return "https://img.icons8.com/ios/50/000000/storm.png";
        default:
            return "https://img.icons8.com/ios/50/000000/sun.png";

    }
}

function fToC(f) {
    return ((f - 32) * (5 / 9)).toFixed(2);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class Weather extends React.Component {

    constructor(props) {
        super(props);

        Geocode.setApiKey(process.env.REACT_APP_GEOCODE_API_KEY);

        this.state = {
            address: "",
            lat: "",
            lng: "",
            place: "",
            weather: {

            }
        }

        this.getCoords = this.getCoords.bind(this);
        this.getWeather = this.getWeather.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(event) {
        this.setState({ address: event.target.value });
    }

    getCoords(e) {
        e.preventDefault();
        if (this.state.address === "") {
            this.state.address = "Sydney, NSW";
        }

        const place = capitalizeFirstLetter(this.state.address);

        Geocode.fromAddress(this.state.address).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                this.setState({
                    lat: lat,
                    lng: lng,
                    place: place,
                })
                this.getWeather();
            },
            error => {
                alert(error);
            }
        );
    }

    async getWeather() {
        let newState = this.state;
        const response = await fetch(`https://api.darksky.net/forecast/${process.env.REACT_APP_WEATHER_API_KEY}/${this.state.lat},${this.state.lng}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok && response.status === 200) {
            const json = await response.json();
            newState.weather = Object.assign(newState.weather, json);
            this.setState({ newState });
        } else {
            alert(response.error);
        }
    }

    render() {

        return (
            <div>
                <form onSubmit={this.getCoords}>
                    <input value={this.state.address}
                        onChange={this.handleOnChange}
                        placeholder="Sydney, NSW">
                    </input>
                    <button type="submit">Check Weather</button>
                </form>
                {this.state.weather.currently ? <DisplayWeather {...this.state.weather}
                    place={this.state.place} /> : ""}
            </div>
        )
    }
}

export default Weather;