import React from 'react';
import { Button, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import axios from 'axios';

class ShowAllProf extends React.Component {

    constructor(){
        super();

        this.state = {
            selectedMajor: "CS",
            professor: [] //array professors 
        }

        this.getProfByMajor = this.getProfByMajor.bind(this);
        this.onClickMenuItem = this.onClickMenuItem.bind(this);
    }

    componentDidMount(){
        this.getProfByMajor(this, 'CS');
    }

    getAllProfToShow()
    {
        if(this.state.professor){
            const selectRow = {
                bgColor: '#fefefe'
            };
            return(
                
                <BootstrapTable 
                    data = {this.state.professor}
                    pagination 
                    search = { true } 
                    multiColumnSearch = { true }
                    selectRow = { selectRow }
                    striped hover condensed
                >
                    <TableHeaderColumn 
                        dataField='name'
                        isKey='1'
                        value = 'name'
                    >
                        Professor
                    </TableHeaderColumn>
                </BootstrapTable>
            )
        }else{
            return(<h1>No Prof to show</h1>)
        }
    }

    onClickMenuItem(e, major){
        console.log("dropdown");
        console.log(this.state.selectedMajor)        
        console.log(major);
        
        if(this.state.selectedMajor != major){
            this.setState({selectedMajor: major}); //update currently selected major
            this.getProfByMajor(this, major);
        }
    }

    getProfByMajor(ev, major){
        axios.get('/getProfByMajor?major='+major) //passing major as an argument
          .then(function(response) {
            console.log("=== getProfByMajor === ");
            console.log(response.data);
            console.log(response.data[0].professor);
            console.log("=== getProfByMajor === ");
            ev.setState({professor:response.data[0].professor})
          });
    }

    render(){

        const showProfessor = this.getAllProfToShow();

        return(
            <div>
                { showProfessor } {/* show the list of professors by selected major */}
                <ButtonToolbar>
                        <DropdownButton
                            bsStyle="default"
                            title="Choose prof by major"
                            noCaret
                            id="dropdown-no-caret"
                        >
                            <MenuItem onClick = { (e) => this.onClickMenuItem(e,"CS")} >CS</MenuItem>
                            <MenuItem onClick = { (e) => this.onClickMenuItem(e,"ECE")} >ECE</MenuItem>
                            <MenuItem onClick = { (e) => this.onClickMenuItem(e,"MATH")} >MATH</MenuItem>
                        </DropdownButton>
                </ButtonToolbar>
            </div>
        )
    }
}

export default ShowAllProf;