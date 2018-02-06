import React from 'react';
import axios from 'axios';
import { List, Avatar, Icon, Slider } from 'antd';

import 'antd/dist/antd.css';

class ProfessorDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      profName: '',
      id: '',
      prof: []
    };
  }

  componentDidMount() {
    let self = this;
    const _id = this.props.match.params.id;
    const name = this.props.match.params.name;
    axios.get('/getProfDetails?_id=' + _id).then(function(response) {
      self.inits(response.data.professor);
    });
  }

  inits(array) {
    array.forEach(element => {
      if (element._id === this.props.match.params.id) {
        this.setState({ profName: element.name });
        this.setState({ id: element._id });
      }
    });
  }

  render() {
    return (
      <div>
        <h1>
          {this.state.profName}
          <div>{this.state.id}</div>
        </h1>
      </div>
    );
  }
}

export default ProfessorDetails;
