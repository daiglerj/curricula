import React, {Component} from "react"
import FontIcon from 'material-ui/FontIcon';

export default class Footer extends Component{

    render(){
        return(
            <div id="Footer">
                <Top />
                <Bottom />
            </div>
        )
    }
    
}

const Top = ()=>{
    return(
        <div id="TopFooter">
            <h1>About</h1>
            <p>Connect with instructors</p>
            <p>Build a better classroom</p>
            <br />
        </div>
    )
}

const Bottom = ()=>{

    return(
        <div id="BottomFooter">
            <FontIcon  color="white" className="material-icons" >school</FontIcon>

            <span class="footerText">Curricula</span>
        </div>
    )
}