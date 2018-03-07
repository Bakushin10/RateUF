import React from 'react';
import axios from 'axios';
import { List, Avatar, Icon, Slider, Menu, Dropdown, Button, Form, FormItem, Input} from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import 'antd/dist/antd.css';
import { ProfessorList } from './ProfessorList';

import Head from './Header-Footer/Head';

class Professor extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedMajor: 'CS',
      professor: [], //array professors to keep
      professorToShow: [], //this array will change based on the search
      searchTerm: '', // user input for search
      loading: false,
      hasMore: true,
      dataloaded : false 
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

  getAllProfByMajor(self, major) {
    axios.get('/getAllProfByMajor', {
        params: {
          major: major
        }
      })
      .then(function(response) {
        self.setState({ professor : response.data });
        self.setState({ professorToShow : response.data });
        self.setState({ dataloaded : true});
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
            <div>
              <Form>
                  <Input 
                    type="text"
                    value={this.state.searchTerm}
                    placeholder="Search your Professor"
                    onChange={this.handleSearchProf}
                  />
              </Form>
            </div>
            <div>
              <Dropdown overlay={menu} title="Change Major">
                <Button>Change Major</Button>
              </Dropdown>
            </div>
            {/* list of prof*/}
            { ProfessorList(this.state.professorToShow, this.state.loading, this.state.hasMore, 
                        this.handleInfiniteOnLoad, this.state.dataloaded) }
      </div>
      </div>
    );
  }
}

export default Professor;
