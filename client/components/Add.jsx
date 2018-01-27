//client/components/Add.js
import React from 'react';
import { Button, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import ShowClassDetail from './ShowClassDetail';

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
        year: '2016',
        month: 'Jan',
        messageFromServer: '',
        data: [],
        selectedMajor: "CS"
      }
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.insertNewExpense = this.insertNewExpense.bind(this);
        this.warning = this.warning.bind(this);
        this.getSubmitButton = this.getSubmitButton.bind(this);
        this.getData = this.getData.bind(this);
        this.getProfByMajor = this.getProfByMajor.bind(this);
    }

    componentDidMount() {
        this.getData(this, '2016');
    }

    componentWillReceiveProps(){

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
        this.getData(this, '2016');
        console.log("this.state.data");
        console.log(this.state.data);
    }

    onClickMenuItem(e, major){
        console.log("dropdown");
        console.log(this.state.selectedMajor)        
        console.log(major);
        
        if(this.state.selectedMajor != major){
            this.setState({selectedMajor: major});
            this.getProfByMajor(this, major);
        }
    }

    getProfByMajor(ev, major){
        axios.get('/getProfByMajor?major='+major)
          .then(function(response) {
            console.log("getProfByMajor === ");
            console.log(response.data);
            //ev.setState({data:response.data})
          });
    }

    getData(ev, year){
        axios.get('/getAll?month=All&year='+year)
          .then(function(response) {
            console.log("response data === ");
            ev.setState({data:response.data})
          });
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
        if(e.target.name == "profName")
            this.setState({ profName: e.target.value })
        
        if(e.target.name == "course")
            this.setState({ course: e.target.value })
        
        if(e.target.name == "major")
            this.setState({ major: e.target.value })
    }
    
    warning(givenState){
        if(givenState){
            return (<WarningOff>text</WarningOff>);
        }
        else{
            return (<WarningOn>Text required</WarningOn>);
        }
    }

    getSubmitButton(){
        const checkListForWarning = 
        [
            this.state.profName,
            this.state.course,
            this.state.major
        ]
        const allFieldChecked = !checkListForWarning.includes('');

        if(allFieldChecked){
            return (<Button bsStyle="success" bsSize="small" 
                    onClick={this.onClick}>Add New Expense</Button>);
        }else{
            return (<Button color="danger" disabled>cant submit</Button> );
        }
    }

   render() {
    const profWarning = this.warning(this.state.profName);
    const courseWarning = this.warning(this.state.course);
    const majorWarning = this.warning(this.state.major);
    const submitButton = this.getSubmitButton();

      return (
        <div className='button-center'>
            <div>
               { profWarning }
               <ButtonToolbar>
                    <DropdownButton
                        bsStyle="default"
                        title="No caret"
                        noCaret
                        id="dropdown-no-caret"
                    >
                        <MenuItem onClick = { (e) => this.onClickMenuItem(e,"CS")} >CS</MenuItem>
                        <MenuItem onClick = { (e) => this.onClickMenuItem(e,"ECE")} >ECE</MenuItem>
                        <MenuItem onClick = { (e) => this.onClickMenuItem(e,"MATH")} >MATH</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="4">Separated link</MenuItem>
                    </DropdownButton>
                </ButtonToolbar>
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
            <div>
                <ShowClassDetail {...this.state} />
            </div>
        </div>
      )
   }
}
export default Add;