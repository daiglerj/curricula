import React, {Component} from 'react'

export default class Instructions extends Component {
    render(){
        return(
            <div className="Instructions">
                <p>{this.props.statement}</p>
            </div>
        )
    }
}