// import HighChart from 'highcharts';
import React, {Component } from "react"; 
import MakelloHighChart from './components/chart/landing_savings_chart';

const MIN_YEAR = 2018;
const MAX_YEAR = 2026;
var chart;

var systemSizeToSystemDescriptionMap = new Map([
    ["1", "Economy"],
    ["3", "Intermediate"],
    ["5", "Premium"]
]);

class SavingsChart extends Component{
    constructor(props){
        super(props);
        this.state={monthlyBillingAmount: this.props.monthlyBillingAmount, // This amount is dynamically generated.
            system_size: 1,
            showForm: false,
            bucket_savings: "$0",
            sys_description: "Choose a System Size"
        }
    }

    handleSystemSizeChange=(event)=>{
        console.log("System size changed to :" + this.system_size);
        this.setState({
            system_size: event.target.value
        })
        get_system_size_data(this.state.monthlyBillingAmount, this.state.system_size);
    }


    render() {
        return (
            <div>
                {/* THIS div should have a grey background */}
                <div>
                You can save <br/>
                <BucketSavings monthlyBillings={this.props.monthlyBillingAmount}
                bucket_savings={this.state.bucket_savings}/><br/>
                annual with 100% clean energy

                </div>
                <div id="chartContainer">
                     {/* This div should have a white background */}
                    <Chart monthlyBillings={this.state.monthlyBillingAmount}
                        system_size={this.state.system_size}/>
                </div>

                    <Slider handleChange={this.handleSystemSizeChange}/>
                    <SliderText system_size={this.state.system_size}/>
                    <hr/>

            </div>
        )
    }
};

class Slider extends React.Component{
    render() {
        return (React.createElement('input', {
            // set max to number of system sizes
            min: "1",
            max: "5",
            defaultValue: "1",
            onChange: this.props.handleChange,
            step: "2",
            type: "range"
        }))
    }
};

class SliderText extends React.Component{
    render(){
        //return Choose A System Size!;
        var text = systemSizeToSystemDescriptionMap.get(this.props.system_size);
        if(!text){
            text = "Choose a System Size";
        }

        return <p id="sliderText"> {text} </p>
    }
};

SliderText.defaultProps=()=>{
    // this did not load, and so Ive put a hack in the sliderText class
    // to set default slider text
    var text= "Choose a system size!";
}



class MonthlyBill extends React.Component{
    render=()=> {
        return <div id= 'monthly-bill-input'> {this.props.monthlyBillings} </div>;
    }
};

class BucketSavings extends React.Component{
    render=()=>{
        update_max_bucket_savings(this.props.monthlyBillings);
        // console.log("returned bucket savings is: " + bucket_savings2);
        return <div id="bucket_savings"> {this.props.bucket_savings} </div>
    }
};

var update_max_bucket_savings = function (monthlyBillings) {
    var bill_input = monthlyBillings;
    var annual_bill = bill_input * 12;
    if (annual_bill < 1000)
        var bucket = 500;
    else
        var bucket = Math.floor(annual_bill / 1000) * 1000;

    var url = "https://wipomo-zoho-database.herokuapp.com/db/" + bucket;

    //return 
    fetch(url)
        .then((response) => {
            //console.log(response.text);
            return response.text()
        })
        .then((response_in_text) => {
            //console.log(JSON.parse(text));
            return JSON.parse(response_in_text)
        })
        .then((data) => {
            //console.log(data[0]["max_discount_percentage"]);
            const text = document.getElementById("bucket_savings");
            var percentage = data[0]["max_discount_percentage"];
            var bucket_savings = bucket * percentage;
            // console.log("Bill: " + monthlyBillings);
            // console.log("Bucket: " + bucket);
            // console.log("Percentage: " + percentage);
            // console.log("Savings: " + bucket_savings);
            var bucket_savings_string = "$" + bucket_savings
            text.innerText = bucket_savings_string;
            return bucket_savings_string;
        })
        .catch(function (e) {
            console.warn("SHOULLD NEVER COME IN HERE!!!");
            console.log(e);
        })
}

var get_system_size_data = function (monthlyBillings, system_size) {
    var numberOfMonthsInAYear = 12;
    var down_payment = 18000;
    var system_size_percentages = [];
    var fixed_cost_savings_amt = 0;
    var cost_savings_data;

    //let buckets = Object.keys(annualElectricBillToMaxSavingsPercent);

    var bill_input = monthlyBillings;
    var annual_bill = bill_input * 12;
    if (annual_bill < 1000)
        var bucket = 500;
    else
        var bucket = Math.floor(annual_bill / 1000) * 1000;
    var sys_size_input = system_size;
    // console.log("Here is the bucket: ");
    // console.log(bucket);
    // console.log("Here is the system size: ");
    var url = " " + bucket + "/" + system_size;
    var myFetch = fetch(url);

    myFetch.then(function (response) {
        response.text().then(
            function (text) {
                let dataToReturn = [];
                cost_savings_data = JSON.parse(text);
                console.log("This is the text in the fetch function")
                console.log(text);
                [...Array(10).keys()].map(key => {
                    let ending_number_string = String(key + 1);
                    // console.log("Cost Savings Data:");
                    // console.log(cost_savings_data);
                    dataToReturn.push(cost_savings_data[0][`yr${ending_number_string}`])
                })
                // console.log("Here is the data being returned:")
                // console.log(dataToReturn);
                if (chart) {
                    chart.setData(dataToReturn);
                } else {
                    chart = new MakelloHighChart('chartContainer', dataToReturn, MIN_YEAR, MAX_YEAR);
                }
            }
        );
    });
}
// 	// return cost_savings_data;
class Chart extends React.Component{

    componentDidMount() {
        //console.log("Component did mount!");
        if (this.props.monthlyBillings && this.props.system_size) {
            //console.log("here is the monthly billings: ");
            //console.log(this.props.monthlyBillings);
            //console.log("Here is the system size: ")
            //console.log(this.props.system_size);
            get_system_size_data(this.props.monthlyBillings, this.props.system_size)

        }
    }

    render() {
        if (chart) {
            //console.log("Hey we got a chart!");
            if (this.props.monthlyBillings && this.props.system_size) {
                // console.log("Here is the monthly billings: ");
                // console.log(this.props.monthlyBillings);
                // console.log("Here is the system size: ");
                console.log(this.props.system_size);
            }
        }

        return null;
    }
};

export default SavingsChart;