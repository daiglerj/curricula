// CheckoutForm.js
import React from 'react';
import {injectStripe} from 'react-stripe-elements';
import {CardElement} from 'react-stripe-elements';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom'


class CheckoutForm extends React.Component {
  componentDidMount(){

  }
  handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
      console.log('Received Stripe token:', token);
      let fetchURL = this.props.baseURL + "chargeCard"
      let fetchOptions = {
        method: "post",
          headers: {
                'Content-Type':'application/json'
            },
        body: JSON.stringify({
          token:token.id,
          userID: this.props.ID,
          courseID: this.props.coursePurchaseID
        })
      }
      fetch(fetchURL,fetchOptions).then(()=>{
        window.location = 'http://localhost:3000/MyCourses';

      })

    })



    // However, this line of code will do the same thing:
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
  }

  render() {
    let style = {
      width: "80%",
      margin:"auto",
      marginTop: "15px",
      marginBottom:"15px"
    }
    let labelStyle = {
      margin:"30px",
    }
    let buttonStyle = {
      margin:"20px"
    }
    return (
      <form onSubmit={this.handleSubmit} style = {style}>

        <CardElement style={{base: {fontSize: '18px'}}} />

         <RaisedButton
              type="submit"
              label="Purchase"
              backgroundColor="lightgreen"
              labelColor = "white"
              style={buttonStyle}
            />

      </form>
    );
  }
}

export default injectStripe(CheckoutForm);