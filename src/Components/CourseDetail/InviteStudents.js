import React, {Component} from "react"
import RaisedButton from 'material-ui/RaisedButton';
import {Elements} from 'react-stripe-elements';
import {StripeProvider} from 'react-stripe-elements';

import {CardElement} from 'react-stripe-elements';

export default class InviteStudents extends Component{
    componentDidMount(){


    }
    render(){
    	let style = {
    		marginTop:"70px"
    	}
        return(
            <div className="PurchaseButtons" style = {style}>
                <RaisedButton label="Invite Students" backgroundColor="#82ca9c" labelColor="white" onClick = {this.props.handleGetLinkModal}/>
            </div>
        )
    }
}
