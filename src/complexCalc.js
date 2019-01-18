import React from "react";
import "./weather.css";
import math from "mathjs";

function DisplayResult(props) {
    const polarForm = (Math.sqrt(Math.pow(props.result.re, 2)+ Math.pow(props.result.im, 2))).toFixed(2)
                        + "∠" + (Math.atan2(props.result.im, props.result.re) * 180 / Math.PI).toFixed(2);
    return (
            <div>
                <br />
                 Cartesian form: {props.result.toString()} <br />
                 Polar form: {polarForm} <br />
            </div>
    )
}

class ComplexCalc extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            expression: "",
            result: "",
        }

        this.handleCalculation = this.handleCalculation.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(event) {
        this.setState({ expression: event.target.value });
    }

    handleCalculation(e) {
        e.preventDefault();
        if (this.state.expression === "") {
            //this.state.expression = "(5 + i) * (3 + 3i)";
            this.state.expression = "e^(i*pi)";
        }
        const result = math.eval(this.state.expression);
        result.re = result.re.toFixed(2);
        result.im = result.im.toFixed(2);
        console.log(result.re + ", " + result.im);
        this.setState({result: result});
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleCalculation}>
                    <input value={this.state.expression}
                        onChange={this.handleOnChange}
                        placeholder="e^(i*pi)">
                    </input>
                    <button type="submit">Calculate</button>
                </form>
                {this.state.result ? <DisplayResult result={this.state.result} /> : ""}
            </div>
        )
    }
}

export default ComplexCalc;