import React, {Component} from 'react'

export default class Instructions extends Component {
    render(){
        return(
            <div>
                <p className="Instructions">{this.props.statement}</p>
            </div>
        )
    }
}