import React, {Component} from "react"

export default class CourseTitle extends Component{
    render(){
        var cartButton ={
            backgroundColor: "white",
            border: "solid 2px #82ca9c",
            color: "#82ca9c"
        }
        return(
            <div className="PurchaseButtons">
                <button>Purchase</button>
                <button style={cartButton} >Add to Cart</button>
            </div>
        )
    }
}