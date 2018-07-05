import React, {Component} from "react"
import "./../../../CSS/EditCourse.css"
import Instructions from "./../../Instructions"
import "./../../../App.css"
import RaisedButton from 'material-ui/RaisedButton';
import Switch from '@material-ui/core/Switch';

export default class Detail extends Component{

	render(){
		const statement = "Add the finishing touches and price your course to sell. Get ready to share your knowledge and utilize the course inside the course inside the classroom."
        var ButtonStyle = {
            marginTop: "30px",
            display: "inline-block",
            textAlign:"center"
            
        }
		return(
			<div className="Section">
				<Instructions statement = {statement} />
				<DetailFields {...this.props} />
			</div>	
		)
	}
}
 
class DetailFields extends Component {
	constructor(props){
		super(props)
		this.state = {
			price: this.props.price,
			requiredMaterials:"",
			checkedLive: this.props.isLive
		}
		this.handlePriceChange = this.handlePriceChange.bind(this)
		this.handleMaterialsChange = this.handleMaterialsChange.bind(this)
		this.handleOnSubmit = this.handleOnSubmit.bind(this)
		this.handleLiveChange = this.handleLiveChange.bind(this)
		this.setLive = this.setLive.bind(this)
	}
	handlePriceChange(event){
		this.setState({
			price:event.target.value
		})
	}

	handleMaterialsChange(event){
		this.setState({
			requiredMaterials: event.target.value
		})
	}

	handleLiveChange = event=>{
		this.setState({ checkedLive: !this.state.checkedLive });

	}

	handleOnSubmit(event){
		let fetchURL = this.props.baseURL + "setCoursePrice"
		let fetchBody = {
			method:"put",
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Price: this.state.price,
                CourseID: this.props.CourseID
            })		
        }
        fetch(fetchURL,fetchBody)
        this.setLive()

	}

	setLive(){
		let fetchURL = this.props.baseURL + "setLive"
		let fetchBody = {
			method:"put",
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                LiveStatus: this.state.checkedLive,
                CourseID: this.props.CourseID
            })		
        }
        fetch(fetchURL,fetchBody)

	}		
	
	render(){
		var ButtonStyle = {
            marginTop: "30px",
            display: "inline-block",
            textAlign:"center"
            
        }
        var switchStyle = {
        	position:"relative",
        	right:"70px"
        }
        var price = this.state.price
        if(price==0){
        	price = "Free"
        }
        else{
        	price = "$" + price
        }
		return(
			<div>
				<form className="Detail">
					<label>Published</label>
					<div style = {switchStyle}>
						<Switch
						          checked={this.state.checkedLive}
						          onClick = {this.handleLiveChange}
						          value="checkedLive"
						          color='primary'
						/>
					</div>
					<label>Course Price</label>
					<div class="slidecontainer">
					  <input type="range" 
					  	min="0" max="50"  
					  	value= {this.state.price} 
					  	class="slider" 
					  	id="myRange" 
					  	onChange = {this.handlePriceChange} />
					</div>
					<span>
						<i class="material-icons">
							label
						</i>
						<span className="price">{price}</span>
					</span> <br />
  					<a href="#"><RaisedButton label="Save" backgroundColor="#82ca9c" labelColor="white" style={ButtonStyle} onClick ={this.handleOnSubmit} /></a>
				</form>
			</div>
		)
	}
}
