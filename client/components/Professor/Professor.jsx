import React from 'react';
import axios from 'axios';
import { List, Avatar, Icon, Menu, Dropdown, Button, Form, FormItem, Input} from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import 'antd/dist/antd.css';
import Search from '../utility/Search';
import Head from '../Header-Footer/Head';
import Foot from '../Header-Footer/Foot';

class Professor extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedMajor: 'CS',
      professor: [], //array professors to keep
      loading: false,
      hasMore: true,
      dataloaded : false,
      reviewForAllProfs : [] // a list of reviews for all professors
    };

    this.getAllProfByMajor = this.getAllProfByMajor.bind(this);
    this.changeProfByMajor = this.changeProfByMajor.bind(this);
  }
  handleInfiniteOnLoad() {
    let data = this.state.professor;
    this.setState({
      loading: true
    });
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
    this.getAllProfReviews(this, 'CS');
  }

  getAllProfByMajor(self, major) {
    axios.get('/getAllProfByMajor', {
        params: {
          major: major
        }
      }).then(function(response) {
        self.setState({ professor : response.data });
        self.setState({ professorToShow : response.data });
      });
  }

  getAllProfReviews(self, major) {
    axios.get('/getAllProfReviews', {
        params: {
          major: major
        }
      }).then(function(response) {
        self.setState({ reviewForAllProfs : response.data });
        self.setState({ dataloaded : true});
        // console.log("reviews in getAllProfREviews")
        // console.log(self.state.reviewForAllProfs)
      });
  }

  changeProfByMajor(e, major) {
    if (this.state.selectedMajor != major) {
      this.setState({ reviewForAllProfs : []}) // set to null
      this.setState({ selectedMajor: major }); //update currently selected major
      this.setState({ dataloaded : false});
      this.getAllProfByMajor(this, major);
      this.getAllProfReviews(this, major);
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

    return (
      <div>
      <Head />
      <div className="container">
        <h1 className="title-here">Find Professor</h1>
        <div>
          <Dropdown overlay={menu} title="Change Major">
            <Button>Filter by Major</Button>
          </Dropdown>
        </div>
        <br/>
        { <Search {...this.state} type = {"Professor"} /> }
      </div>
      <Foot />
      </div>
    );
  }
}

export default Professor;
