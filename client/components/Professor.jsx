import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { List, Avatar, Icon, Slider} from 'antd';
import { Row, Grid, Col, DropdownButton, MenuItem,FormGroup, FormControl} from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';
import 'antd/dist/antd.css';

import Header from './New_Header';
import Footer from './Footer';

const ProfessorName = styled.h5`
    color:#878fad;
    padding-top: 15px;
    padding-left: 30px;
`

class Professor extends React.Component {
    constructor() {
        super();

        this.state = {
            selectedMajor: "CS",
            professor: [], //array professors to keep
            professorToShow:[], //this array will change based on the search
            searchTerm: '', // user input for search
            loading: false,
            hasMore: true
        }

        this.getProfByMajor = this.getProfByMajor.bind(this);
        this.handleSearchProf = this.handleSearchProf.bind(this);
        this.searchProf = this.searchProf.bind(this);
    }   

    handleInfiniteOnLoad() {
        let data = this.state.professor;
        this.setState({
            loading: true
        });
        if (data.length > 14) {
            message.warning('Infinite List loaded all');
            this.setState({
            hasMore: false,
            loading: false
            });
            return;
        }
        this.getData(res => {
            data = data.concat(res.results);
            this.setState({
            data,
            loading: false
            });
        });
    }
    
    componentDidMount(){
        this.getProfByMajor(this, 'CS');
      //  this.setState({selectedMajor:'CS'});
    }
    
    handleSearchProf(e) {
        this.setState({ searchTerm: e.target.value });
        this.searchProf();
    }

    searchProf(){
        const selectedProf = this.state.professor.filter(prof =>{
            if(`${prof.name}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase())>=0){
                return prof;
            }
        })
        this.setState({professorToShow : selectedProf})
    }

    getProfByMajor(ev, major){
        axios.get('/getProfByMajor?major='+major) //passing major as an argument
          .then(function(response) {
            ev.setState({professor:response.data[0].professor});
            ev.setState({professorToShow:response.data[0].professor});
          });
    }
    
    handleInfiniteOnLoad() {
        let data = this.state.professor;
        this.setState({
          loading: true,
        });
    }

    changeProfByMajor(e, major){
        if(this.state.selectedMajor != major){
            this.setState({selectedMajor: major}); //update currently selected major
            this.getProfByMajor(this, major);
        }
    }

  render() {
    const pagination = {
      pageSize: 10,
      current: 1,
      total: this.state.professor.length,
      onChange: () => {}
    };

    const IconText = ({ type, text }) => (
        <span>
            <Icon type={type} style={{ marginRight: 8 }} />
            {text}
        </span>
    );

    console.log(this.state)
    
    return(
        <div className = "container">
        <Header />
            <Grid>
                <Col xs = {12} md = {3} className = "sidebar">{/* side bar*/}
                    <div>
                        <form>
                            <FormGroup controlId="formBasicText">
                                <FormControl
                                    type="text"
                                    value={this.state.searchTerm}
                                    placeholder="Search your Professor"
                                    onChange={this.handleSearchProf}
                                />
                            </FormGroup>
                        </form>
                    </div>
                    <div>
                        <DropdownButton
                            bsStyle="default"
                            title="Change Major"
                            noCaret
                            id="dropdown-no-caret"
                        >
                            <MenuItem onClick = { (e) => this.changeProfByMajor(e,"CS")} >CS</MenuItem>
                            <MenuItem onClick = { (e) => this.changeProfByMajor(e,"ECE")} >ECE</MenuItem>
                            <MenuItem onClick = { (e) => this.changeProfByMajor(e,"MATH")} >MATH</MenuItem>
                        </DropdownButton>
                    </div>
                </Col>
                <Col xs = {12} md = {9}>{/* lift of prof*/}
                    <InfiniteScroll className = "demo-infinite-container"
                        initialLoad={false}
                        pageStart={0}
                        loadMore={this.handleInfiniteOnLoad}
                        hasMore={!this.state.loading && this.state.hasMore}
                        useWindow={false}
                    >
                        <List 
                            itemLayout="vertical"
                            size="large"
                            pagination={pagination}
                            dataSource={ this.state.professorToShow }
                            renderItem={item => (
                                <Link to={`/ProfessorDetails/${item._id}`}>
                                    <Row>
                                        <Col xs = {12} md = {4}>
                                                <ProfessorName>{item.name}</ProfessorName>
                                        </Col>
                                        <Col xs = {7} md = {5}>
                                            <Slider className = "ant-slider-disabled" /*.ant-slider-disabled*/
                                                defaultValue={30} 
                                                disabled = {true} 
                                                marks={{ 
                                                        30: <div><Icon type="frown-o" style={{ fontSize: 15, color: '#db0f0f' }}/><div>meh</div></div>,
                                                        60: <div><Icon type="meh-o"   style={{ fontSize: 15, color: '#08c' }}/><div>good</div></div>, 
                                                        90: <div><Icon type="smile-o" style={{ fontSize: 15, color: '#77f987' }}/><div>excellent</div></div> 
                                                        }}
                                            />
                                        </Col>
                                    </Row>
                                    <Col xs = {9} md = {9}>
                                        <List.Item xs = {9} md = {9}
                                            key={item.id}
                                            /*
                                            actions={[<IconText type="star-o" text="156" />, 
                                                    <IconText type= "like-o" text="156" />, 
                                                    <IconText type="message" text="2" />]}
                                            */
                                        >
                                        <List.Item.Meta/>
                                        </List.Item>
                                    </Col>
                                </Link>
                            )}
                        />
                    </InfiniteScroll>
                </Col>
            </Grid>
         <Footer />
        </div>
        )
    }
}

export default Professor;
