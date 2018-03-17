import React, {Component} from "react"; 


export default class MostPopular extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return(
            <div>
                <h1 className="CategoryHeading">Most Popular</h1>
                <CardHolder />
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
                <Card />
                <Card />
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
            textAlign:"Left"
            
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
            width: "150px"

        }
        let price = {
            position:"relative",
            top: "45px",
            left:"150px",
            fontSize: "25px",
            color: "#82ca9c"
        }
        return(
           <div style={style}>
                <h1 style={titleStyle}>Introduction to Algebra 101</h1>
                <p style = {paragraphStyle}>John Flickenger</p>
                <span style={price}>$20</span>
           </div>
        )

    }
}