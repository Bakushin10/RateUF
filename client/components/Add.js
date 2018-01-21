//client/components/Add.js
import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
var querystring = require('querystring');


const WarningOn = styled.p`
  color: #FF1493;
`
const WarningOff = styled.p`
  color: #ADFF2F;
`

class Add extends React.Component {
    constructor() {
      super();
      
      this.state = {
        profName: '',
        course: '',
        major: '',
        year: '',
        messageFromServer: ''
      }
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.insertNewExpense = this.insertNewExpense.bind(this);
        this.warningOff = this.warningOff.bind(this);
        this.warningOn = this.warningOn.bind(this);
    }

    componentDidMount() {
        this.setState({
            month: this.props.selectedMonth
        });
        this.setState({
            year: this.props.selectedYear
        });
    
    }
    handleSelectChange(e) {
        if (e.target.name == 'month') {
            this.setState({
            month: e.target.value
            });
        }
        if (e.target.name == 'year') {
            this.setState({
            year: e.target.value
            });
        }
    }

    onClick(e) {
        this.insertNewExpense(this);
    }

    insertNewExpense(e) {
        axios.post('/insert',
            querystring.stringify({
                profName: e.state.profName,
                course: e.state.course,
                major: e.state.major,
                month: e.state.month,
                year: e.state.year
            }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
            }).then(function(response) {
            e.setState({
                messageFromServer: response.data
            });
        });

        //set the state back to null
        this.setState({ profName: '' });
        this.setState({ course: '' });
        this.setState({ major: '' });
        
    }

    handleTextChange(e) {
        console.log(e.target.value);
        if(e.target.name == "profName")
            this.setState({ profName: e.target.value })
        
        if(e.target.name == "course")
            this.setState({ course: e.target.value })
        
        if(e.target.name == "major")
            this.setState({ major: e.target.value })
    }
    
    warningOff(){
        return (<WarningOff>text</WarningOff>);
    }
    warningOn(){
        return (<WarningOn>Text required</WarningOn>);
    }

   render() {

    let profWarning, courseWarning, majorWarning, allFieldEntered;
    let submitButton;
    const checkListForWarning = 
    [
        this.state.profName,
        this.state.course,
        this.state.major
    ]
    const allFieldChecked = !checkListForWarning.includes('');

    if(this.state.profName){
        profWarning = this.warningOff();
    }else{
        profWarning  = this.warningOn();
    }

    if(this.state.course){
        courseWarning = this.warningOff();
    }else{
        courseWarning  = this.warningOn();
    }

    if(this.state.major){
        majorWarning = this.warningOff();
    }else{
        majorWarning  = this.warningOn();
    }

    if(allFieldChecked){
        submitButton = <Button bsStyle="success" bsSize="small" 
                        onClick={this.onClick}>Add New Expense</Button>
    }else{
        submitButton = (<Button color="danger" disabled = 'false'>cant submit</Button> );
    }

    //if(this.state.messageFromServer == ''){
      return (
        <div className='button-center'>
            <div>
               { profWarning }
               <input ref= {this.state.profName.value} onChange = { this.handleTextChange } 
                type = "text" name = "profName" value = {this.state.profName} placeholder = "prof name "/>
            </div>

            <div>
               { courseWarning }
               <input ref= {this.state.course.value} onChange = { this.handleTextChange } 
                type = "text" name = "course" value = {this.state.course} placeholder = "course "/>
            </div>    

            <div>
               { majorWarning }
               <input ref= {this.state.major.value} onChange = { this.handleTextChange } 
                type = "text" name = "major" value = {this.state.major} placeholder = "major " />
            </div>    
                
            { submitButton }
        </div>
      )
   //}
   }
}
export default Add;