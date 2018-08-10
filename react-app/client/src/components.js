import React, {Component} from 'react'
import "./components.css"

// These are examples of functional stateless components
// in comparison to React class components
export class Slider extends Component{
    // constructor(props){
    //     super(props);
    // }
    render(){
        return(
            <div>
            $50
            <input type="range" id="landing_p_slider"
            min={this.props.min} max={this.props.max} step={this.props.step} onInput={this.props.onInput} ></input>
            <output for="landing_p_slider" onforminput="value = landing_p_slider.valueAsNumber;"></output>
            $5000
            </div>
        )
    }
};

export class BillAmount extends Component{
    // constructor(props){
    //     super(props);
    //     //this.state = {amount: this.props.amount};
    // }
    render(){
        //console.log("Amt is: "+ this.props.amount);
        return(<div>
            Monthly: $ {this.props.amount} Yearly: ${this.props.amount*12}
        </div>)
    }
    // React.createElement('div', null, 'Monthly: $',
    // React.createElement('text', {id: 'monthly'}, props.amount), ' Yearly: $',
    // React.createElement('text', {id: 'yearly'}, props.amount*12))
};

export class Email extends Component{
    // constructor(props){
    //     super(props);
    // }
    render(){
        return <input placeholder="Email*" display="block" onChange={this.props.onChange}></input>
    }
};

export class Button extends React.Component{
    // constructor(props){
    //     super(props);
    // }
    //this.handleBtnClick = this.handleBtnClick.bind(this);
    // this.handleSliderChange = this.handleSliderChange.bind(this);
    // this.emailStateHandler = this.emailStateHandler.bind(this);
    render(){
         return <button id="button_attrb" disabled={this.props.disabled} onClick={this.props.onClick} >Submit</button>
        //return <button id="button_attrb" onClick={this.props.onClick} >Submit</button>
    }
//React.createElement('button', { id: "button_attrb", handlebtnclick:props.handleBtnCLick}, "Submit")
};
    // React.createElement('div', {id: 'landingContainer'}, 
    // React.createElement('text', {},  "What's your monthly electric bill?"),
    // React.createElement('div', {id:'sliderContainer'},  React.createElement(Slider, {min:"50", max:"5000", step:"50", onInput: this.handleChange}, null)),
    // React.createElement('div', null,React.createElement(BillAmount, {amount: 50}, null)),
    // React.createElement('div', null, React.createElement(Email, {onInput: this.emailStateHandler}, null)),
    // React.createElement(Button, {showCostSavings: this.handleBtnClick}, null))