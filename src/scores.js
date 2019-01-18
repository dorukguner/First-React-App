import React from "react";

class Scores extends React.Component {

    constructor(props) {
        super(props);

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

    async getWeather() {
        let newState = this.state;
        const response = await fetch(`http://api.football-data.org/v2/teams?name=Manchester%20United`, {
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
                <form onSubmit={this.getTeam}>
                    <input value={this.state.address}
                        onChange={this.handleOnChange}
                        placeholder="Sydney, NSW">
                    </input>
                    <button type="submit">Check Weather</button>
                </form>
            </div>
        )
    }
}

export default Scores;