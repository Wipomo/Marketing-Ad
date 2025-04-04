import React from 'react';
import {Email, WipomoSlider, BillAmount, Button} from '../../components/components';
import {withRouter} from "react-router-dom";

const min_slider_value= 50;
const max_slider_value=5000;
const slider_increment_step = 50;

class LandingPageBox extends React.Component{

    state = {
        toSavings: false
    }
    // ask for `router` from context
//   contextTypes= {
//     router: React.PropTypes.func.isRequired,
//   }


    handleBtnClick = () =>{
        this.setState({toSavings: true});
        this.props.history.push('/savings');
    }


    render(){
        const savings ={
            pathname: '/savings',
            state: {amount: 60}
        }
    if (this.state.toSavings){
        this.setState({toSavings: false})
        //  browserHistory.push('/savings');
        // this.context.router.push('/savings');
        //this.props.history.push('/savings');
        // return <Redirect to='/savings' />
    }

    const {handleSliderChange, monthlyBill, email, emailStateHandler, disableLandingPageBtn} = this.props;
    return(
        <div id="landingBox">

        <div id="monthlyText"><p>What's your monthly electric bill?</p></div>
        
        <div id ="sliderContainer">
            <div id="sliderContent">
                <WipomoSlider id="wipomoSlider" min={min_slider_value} max={max_slider_value} step={slider_increment_step} onInput={handleSliderChange} monthlyBill={this.props.monthlyBill}/>
                {/* Billing Amount should eventually be replaced with slider component css
                <BillAmount amount={monthlyBill} /> */}
            </div>
        </div>
        
        <div id="emailContainer">
                <div id="emailContent">
                    <Email value={email} onChange={emailStateHandler}/>
                </div>
                <div id="buttonContent">
                    <Button onClick={this.handleBtnClick} disabled={disableLandingPageBtn}/>
                </div>
        </div>
        
        </div>
)
}
}

export default withRouter(LandingPageBox)