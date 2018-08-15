import React, {Component} from 'react'
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import "./components.css"

const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;

  return (
    <Tooltip
      id="sliderHandle"
      prefixCls="rc-slider-tooltip"
      overlay={"$"+value}
      visible={true}
      defaultVisible = {true}
      placement="bottom"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

// These are examples of functional stateless components
// in comparison to React class components
export class WipomoSlider extends Component{
    // constructor(props){
    //     super(props);
    // }

    render(){
        let {min,max,step, onInput} = this.props;
        min = parseInt(min, 10);
        max = parseInt(max, 10);
        step = parseInt(step, 10);
        const marksStyle = {
            fontFamily: 'Montserrat',
            color: '#1b30a5',
            fontSize: 16
          }; 
        const marks = {
            [min]: {
              style: marksStyle,
              label: <div>${min}</div>,
            },
            [max]: {
                style: marksStyle,
                label: <div>${max}</div>,
              }
          };
        const sliderContainerStyle = {margin: 'auto', top: 0, left: 0, bottom: 0, right: 0, width: 500 }
        const sliderStyle = { backgroundColor: 'white', height: 8};


        return(
            <div style={sliderContainerStyle}>
            <Slider marks={marks} trackStyle={sliderStyle} railStyle={sliderStyle} id="landing_p_slider" min={min} max={max} defaultValue={max/2} step={step} handle={handle} onSliderChange={onInput} />
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
