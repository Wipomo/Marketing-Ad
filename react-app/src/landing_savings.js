
import React, {Component } from "react"; 
import {HighChart} from './landing_savings_chart.js';

const MIN_YEAR = 2018;
const MAX_YEAR = 2026;

const monthlyBillingAmountGlobal = 167;
console.log("Monthly Billing Amount is : " + monthlyBillingAmountGlobal)

var chart;

var systemSizeToSystemDescriptionMap = new Map([
    ["1", "Economy"],
    ["3", "Intermediate"],
    ["5", "Premium"]
]);

class view_savings extends Component{
    getInitialState () {
        return this.state = {
            monthlyBillingAmount: monthlyBillingAmountGlobal, // This amount is dynamically generated.
            system_size: 1,
            showForm: false,
            bucket_savings: "$0",
            sys_description: "Choose a System Size"
        };
    }
    handleChange (event) {
        var newMonthlyBill = event.target.value;
        if (newMonthlyBill > -1 && newMonthlyBill < 5000) {
            this.setState({
                monthlyBillingAmount: event.target.value
            })
            this.setState({
                bucket_savings: update_max_bucket_savings(this.state.monthlyBillingAmount)
            })
        }
    }
    handleSystemSizeChange (event) {
        this.setState({
            system_size: event.target.value
        })
        get_system_size_data(this.state.monthlyBillingAmount, this.state.system_size);
    }
    handleClick() {
        this.setState({
            showForm: !this.state.showForm
        })
    }
    handleFormSubmitButton() {
        // validate then add form data to db, for specific customer,
        
        //then redirect page
        window.location = '/landing_customer_form.html'
        // +getElementById('fullName').innerText()+
        // "/"+getElementById('phoneNumber').innerText()+"/"+getElementById('address').innerText()+
        // "/"+getElementById('city').innerText()+"/"+getElementById('state').innerText()+"/"
        // +getElementById('zipcode').innerText()
    }
    render() {
        return (
            React.createElement('div', {},
                React.createElement('div', {}, React.createElement(MonthlyBill, {
                    monthlyBillings: this.state.monthlyBillingAmount
                }, null)),
                React.createElement('div', {
                    id: "bucket_savings_container"
                }, 'You can save', React.createElement(BucketSavings, {
                    monthlyBillings: this.state.monthlyBillingAmount,
                    bucket_savings: this.state.bucket_savings
                }, null), "annual with 100% Clean Energy"),
                React.createElement('div', {
                    id: 'chartContainer'
                }, React.createElement(Chart, {
                    monthlyBillings: this.state.monthlyBillingAmount,
                    system_size: this.state.system_size
                }, null)),
                React.createElement('div', {}, React.createElement(Slider, {
                    handleChange: this.handleSystemSizeChange
                }, null)),
                React.createElement(sliderText, {
                    text: systemSizeToSystemDescriptionMap.get(this.state.system_size),
                }, null),
                React.createElement(getReportBtn, {
                    handleClick: this.handleClick
                }, null),
                React.createElement(customerForms, {
                    showForm: this.state.showForm,
                    handleFormSubmitButton: this.handleFormSubmitButton
                }, null)
            ));
    }
};

var sliderText = React.createClass({
    getDefaultProps: function () {
        return {
            text: "Choose A System Size!"
        };
    },
    render: function () {
        return React.createElement('text', {}, this.props.text);
    }
});

var SavingsRate = React.createClass({
    render: function () {
        // Monthly billing amount is this.props.monthlyBillings
        //let buckets = Object.keys(annualElectricBillToMaxSavingsPercent);
        let monthlyRatePercentage = 0;
        for (var i = 0; i < buckets.length; i++) {
            if (buckets[i] > (this.props.monthlyBillings * 12)) {
                //monthlyRatePercentage = annualElectricBillToMaxSavingsPercent[buckets[i]]
                i = buckets.length;
            }
        }
        return React.createElement('div', {}, 'Your monthly savings rate: ' + monthlyRatePercentage);
    }
});
var MonthlyBill = React.createClass({
    render: function () {
        return React.createElement('text', {
            id: 'monthly-bill-input'
        }, this.props.monthlyBillings);
        // return React.createElement('input readOnly', {
        //     type: 'text',
        //     value: this.props.monthlyBillings,
        //     //onChange: this.props.handleChange,
        //     id: 'monthly-bill-input'
        // }, null);
    }
});

var BucketSavings = React.createClass({
    render: function () {
        update_max_bucket_savings(this.props.monthlyBillings);
        // console.log("returned bucket savings is: " + bucket_savings2);
        return (
            React.createElement('div', {},
                React.createElement('text', {
                    id: "bucket_savings"
                }, this.props.bucket_savings))
        );
    }
});

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
            console.log("Bill: " + monthlyBillings);
            console.log("Bucket: " + bucket);
            console.log("Percentage: " + percentage);
            console.log("Savings: " + bucket_savings);
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
    console.log(system_size);
    var url = "https://wipomo-zoho-database.herokuapp.com/db/" + bucket + "/" + system_size;
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
                    chart = new HighChart('chartContainer', dataToReturn, MIN_YEAR, MAX_YEAR);
                }
            }
        );
    });
}
// 	// return cost_savings_data;
var Chart = React.createClass({

    componentDidMount: function () {
        //console.log("Component did mount!");
        if (this.props.monthlyBillings && this.props.system_size) {
            //console.log("here is the monthly billings: ");
            //console.log(this.props.monthlyBillings);
            //console.log("Here is the system size: ")
            //console.log(this.props.system_size);
            get_system_size_data(this.props.monthlyBillings, this.props.system_size)

        }
    },

    render: function () {
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
});

var Slider = React.createClass({
    render: function () {
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
});

var getReportBtn = React.createClass({
    render: function () {
        return (
            React.createElement('div', {}, React.createElement('button', {
                id: 'btn',
                onClick: this.props.handleClick
            }, "Prove It!"))
        )
    }
});


var customerForms = React.createClass({

    render: function () {
        return React.createElement('div', {
            className: this.props.showForm ? "visible" : "not_visible"
        }, React.createElement('input', {
            type: "text",
            placeholder: "Full Name*",
            id:'fullName'
        }, null), React.createElement('input', {
            type: "text",
            placeholder: "Phone",
            id:'phoneNumber'
        }, null), React.createElement('input', {
            type: "text",
            placeholder: "Address*",
            id: 'address'
        }, null), React.createElement('input', {
            type: "text",
            placeholder: "City*",
            id: 'city'
        }, null), React.createElement('input', {
            type: "text",
            placeholder: "State*",
            id:'state'
        }, null), React.createElement('input', {
            type: "text",
            placeholder: "Zipcode",
            id:'zipcode'
        }, null), React.createElement('button', {
            type: "button",
            onClick: this.props.handleFormSubmitButton
        }, "Submit"))
    }
});

export default view_savings;
// ReactDOM.render(
//     React.createElement(view_savings, {}), document.getElementById('react-test'));