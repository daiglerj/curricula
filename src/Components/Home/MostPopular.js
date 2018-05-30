import React, {Component} from "react"; 
import {Link} from 'react-router-dom'
import { connect } from "react-redux"
import {setCoursePurchaseID} from "./../../Actions/courseViewActions"

const mapStateToProps = (state)=>{
    return {

    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        setCoursePurchaseID: (id)=>dispatch(setCoursePurchaseID(id)),
       
    }  
}


class MostPopular extends Component{
    constructor(props){
        super(props)
    }
 
    render(){

        return(
            <div>
                <h1 className="CategoryHeading">Most Popular</h1>
                <CardHolder {...this.props} setCoursePurchaseID={this.props.setCoursePurchaseID} />
            </div>
        )
    }
}
class CardHolder extends Component{
    
    render(){
        let style={
            textAlign:"left",
            marginLeft: "100px"
        }
        return(
            <div style={style}>
                {this.props.courses.map(card=>{
                    return <Link to="/CourseDetail"><Card 
                        key={card.ID}
                        id={card.ID}
                        title = {card.CourseName}
                        price = {card.Price}
                        name = {card.FirstName + " " + card.LastName}
                        setCoursePurchaseID = {this.props.setCoursePurchaseID}
                    /></Link>

                })}

            </div>
        
        )
    }
}
class Card extends Component {
    constructor(props){
        super(props)

    }

    render(){
        let style = {
            width: "200px",
            height: "200px",
            marginLeft: "20px",
            border: "solid 1px #c7c7c7",
            borderTop: "solid 12px #82ca9c",
            borderRadius: "9px",
            cursor:"pointer",
            display:"inline-block",
            textAlign:"Left",
            verticalAlign:"middle",
            position:"relative",
            padding:"10px",
            marginTop:"20px",
            background:"white"
            
        }
        let titleStyle = {
            fontSize: "20px",
            color:"#52575b",
            textAlign:"Left",
            marginLeft: "10px"
        }
        let paragraphStyle = {
            textAlign: "left",
            fontSize: "14px",
            color: "#8a949e",
            marginLeft: "20px",
            marginTop:"5px",
            paddingBottom: "10px",
            borderBottom: "solid 1px",
            width: "150px",
            position:"absolute",
            bottom: "100px"

        }

        let price = "$" + this.props.price
        if (price=="$0"){
            price = "Free"

        }
        let priceStyle = {
            position:"absolute",
            right: "20px",
            bottom:"18px",
            fontSize: "25px",
            color: "#82ca9c"
        }

        return(
           <div style={style} class="CourseCard" onClick = {()=>this.props.setCoursePurchaseID(this.props.id)}>
                <h1 style={titleStyle}>{this.props.title}</h1>
                <p style = {paragraphStyle}>{this.props.name}</p>
                <span style={priceStyle}>{price}</span>
           </div>
        )

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MostPopular)