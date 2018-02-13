import React from 'react';
import axios from 'axios';
import { List, Avatar, Icon, Slider} from 'antd';
import { Link } from 'react-router-dom';
import { Row, Grid, Col, DropdownButton, MenuItem } from 'react-bootstrap';
import { Menu, Dropdown, Button} from 'antd';

import 'antd/dist/antd.css';

class ProfessorDetails extends React.Component {
    
    constructor(){

        super();

        this.state = {
            profName : "",
            id: "",
            major: ""
        }
     }

    componentDidMount(){
        let self = this;
        const _id = this.props.match.params.id;
        const name = this.props.match.params.name;
        const major = this.props.match.params.major;

        axios.get('/getProfDetails',{
            params:{
                major : major,
                _id : _id
            }
        })
        .then(function(response) {
            self.init(response.data);
          });  
    }

    init(profInfo){
        this.setState({profName:profInfo.name})
        this.setState({id:profInfo._id})
        this.setState({major:profInfo.major})
    }

    jumpToSelectedClass(e, major){
        console.log("clicked!")
    }

    render(){
        console.log(this.state)
        return(
            <div className = "container">
                <Grid>
                    <Row> {/* fitst row */}
                        <Col xs = {3} md = {3}>
                            {this.state.profName}
                            <div>
                                <Button type="primary" ghost>
                                        <Link to={`/ProfessorForm/${this.state.major}/${this.state.profName}`}>
                                        Rate this professor
                                    </Link>
                                </Button>
                            </div>
                        </Col>
                        <Col xs = {3} md = {3}>
                            Departmemnt : {this.state.major}
                            <div>
                            <DropdownButton
                                bsStyle="default"
                                title="Previously taught"
                                noCaret
                                id="dropdown-no-caret"
                            >
                                <MenuItem onClick = { (e) => this.jumpToSelectedClass(e,"CS")} >CS</MenuItem>
                                <MenuItem onClick = { (e) => this.jumpToSelectedClass(e,"ECE")} >ECE</MenuItem>
                                <MenuItem onClick = { (e) => this.jumpToSelectedClass(e,"MATH")} >MATH</MenuItem>
                            </DropdownButton>
                            </div>
                        </Col>
                        <Col xs = {6} md = {6} >
                            <div>
                                OverAll Experiense
                            </div>
                            <div>
                                OverAll Experiense
                            </div>
                        </Col>
                    </Row>
                    <Col>

                        list of form here
                        {/* list of form here */}


                    </Col>
                </Grid>
            </div>
        )
    }
}

export default ProfessorDetails;
