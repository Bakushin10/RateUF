import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { List, Avatar, Icon, Slider, Menu, Dropdown, Button } from 'antd';
import { Row, Grid, Col, FormGroup, FormControl } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';
import 'antd/dist/antd.css';

import Head from './Header-Footer/Head';

const ProfessorName = styled.h5`
  color: #878fad;
  padding-top: 15px;
  padding-left: 30px;
`;

class Professor extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedMajor: 'CS',
      professor: [], //array professors to keep
      professorToShow: [], //this array will change based on the search
      searchTerm: '', // user input for search
      loading: false,
      hasMore: true
    };

    this.getAllProfByMajor = this.getAllProfByMajor.bind(this);
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

  componentDidMount() {
    this.getAllProfByMajor(this, 'CS');
    //  this.setState({selectedMajor:'CS'});
  }

  handleSearchProf(e) {
    this.setState({ searchTerm: e.target.value });
    this.searchProf();
  }

  searchProf() {
    const selectedProf = this.state.professor.filter(prof => {
      if (`${prof.name}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0) {
        return prof;
      }
    });
    this.setState({ professorToShow: selectedProf });
  }

  getAllProfByMajor(ev, major) {
    axios
      .get('/getAllProfByMajor', {
        params: {
          major: major
        }
      })
      .then(function(response) {
        ev.setState({ professor: response.data });
        ev.setState({ professorToShow: response.data });
      });
  }

  handleInfiniteOnLoad() {
    let data = this.state.professor;
    this.setState({
      loading: true
    });
  }

  changeProfByMajor(e, major) {
    if (this.state.selectedMajor != major) {
      this.setState({ selectedMajor: major }); //update currently selected major
      this.getAllProfByMajor(this, major);
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

    const menu = (
      <Menu>
        <Menu.Item>
          <div onClick={e => this.changeProfByMajor(e, 'CS')} align="center">
            CS
          </div>
        </Menu.Item>
        <Menu.Item>
          <div onClick={e => this.changeProfByMajor(e, 'ECE')} align="center">
            ECE
          </div>
        </Menu.Item>
        <Menu.Item>
          <div onClick={e => this.changeProfByMajor(e, 'MATH')} align="center">
            MATH
          </div>
        </Menu.Item>
      </Menu>
    );

    console.log(this.state);

    return (
      <div>
      <Head />
      <div className="container">
        <Grid>
          <Col xs={12} md={3} className="sidebar">
            {/* side bar*/}
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
              <Dropdown overlay={menu} title="Change Major">
                <Button>Change Major</Button>
              </Dropdown>
            </div>
          </Col>
          <Col xs={12} md={9}>
            {/* list of prof*/}
            <InfiniteScroll
              className="demo-infinite-container"
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
                dataSource={this.state.professorToShow}
                renderItem={item => (
                  <Link to={`/ProfessorDetails/${item.major}/${item._id}/${item.name}`}>
                    <Row>
                      <Col xs={12} md={4}>
                        <ProfessorName>{item.name}</ProfessorName>
                      </Col>
                      <Col xs={7} md={5}>
                        <Slider
                          className="ant-slider-disabled" /*.ant-slider-disabled*/
                          defaultValue={30}
                          disabled={true}
                          marks={{
                            30: (
                              <div>
                                <Icon type="frown-o" style={{ fontSize: 15, color: '#db0f0f' }} />
                                <div>meh</div>
                              </div>
                            ),
                            60: (
                              <div>
                                <Icon type="meh-o" style={{ fontSize: 15, color: '#08c' }} />
                                <div>good</div>
                              </div>
                            ),
                            90: (
                              <div>
                                <Icon type="smile-o" style={{ fontSize: 15, color: '#77f987' }} />
                                <div>excellent</div>
                              </div>
                            )
                          }}
                        />
                      </Col>
                    </Row>
                    <Col xs={9} md={9}>
                      <List.Item
                        xs={9}
                        md={9}
                        key={item.id}
                        /*
                                        actions={[<IconText type="star-o" text="156" />, 
                                                <IconText type= "like-o" text="156" />, 
                                                <IconText type="message" text="2" />]}
                                        */
                      >
                        <List.Item.Meta />
                      </List.Item>
                    </Col>
                  </Link>
                )}
              />
            </InfiniteScroll>
          </Col>
        </Grid>
        {/* <Footer /> */}
      </div>
      </div>
    );
  }
}

export default Professor;
