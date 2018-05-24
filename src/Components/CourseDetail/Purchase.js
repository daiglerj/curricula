import React, {Component} from "react"
import RaisedButton from 'material-ui/RaisedButton';
import {Elements} from 'react-stripe-elements';
import {StripeProvider} from 'react-stripe-elements';

import {CardElement} from 'react-stripe-elements';

export default class Purchase extends Component{
    componentDidMount(){


    }
    render(){
        return(
            <div className="PurchaseButtons">
                <RaisedButton label="Purchase" backgroundColor="#82ca9c" labelColor="white" onClick = {this.props.handlePaymentModal}/>
            </div>
        )
    }
}
