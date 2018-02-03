import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { List, Avatar, Icon, Slider} from 'antd';
import { Row, Grid, Col} from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroller';

import 'antd/dist/antd.css';

class Professor extends React.Component {
    
    constructor(){

        super();

        this.state = {
            selectedMajor: '',
            professor: [] //array professors 
        }

        this.getProfByMajor = this.getProfByMajor.bind(this);
    }

    componentDidMount(){
        this.getProfByMajor(this, 'CS');
        this.setState({selectedMajor:"CS"});
    }

    getProfByMajor(ev, major){
        axios.get('/getProfByMajor?major='+major) //passing major as an argument
          .then(function(response) {
            console.log("=== getProfByMajor === ");
            console.log(response.data);
            console.log(response.data[0].professor);
            console.log("=== getProfByMajor === ");
            ev.setState({professor:response.data[0].professor});
            ev.setState({selectedMajor:response.data.major});
          });
    }
    
    handleInfiniteOnLoad() {
        let data = this.state.professor;
        this.setState({
          loading: true,
        });
        if (data.length > 14) {
          message.warning('Infinite List loaded all');
          this.setState({
            hasMore: false,
            loading: false,
          });
          return;
        }
        this.getData((res) => {
          data = data.concat(res.results);
          this.setState({
            data,
            loading: false,
          });
        });
      }

    render(){

        const pagination = {
            pageSize: 10,
            current: 1,
            total: this.state.professor.length,
            onChange: (() => {}),
        };

        const IconText = ({ type, text }) => (
            <span>
              <Icon type={type} style={{ marginRight: 8 }} />
              {text}
            </span>
        );
        
        console.log("this.state.selectedMajor")
        console.log(this.state)
        return(
            <div className = "container">
              <InfiniteScroll
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
                    dataSource={ this.state.professor }
                    renderItem={item => (
                        <Link to={`/ProfessorDetails/${item._id}`} {...item} param = {{id:item._id}}>
                            <Grid>
                                <Row>
                                    <Col xs = {12} md = {4}>
                                            {item.name}
                                    </Col>
                                    <Col xs = {7} md = {6}>
                                        <Slider defaultValue={30} 
                                                disabled = {true} 
                                                marks={{ 25: 'meh', 50: 'Ok', 75: 'good', 100: 'marry me!' }} 
                                        />
                                    </Col>
                                </Row>
                            </Grid>
                            <List.Item
                                key={item.id}
                                actions={[<IconText type="star-o" text="156" />, 
                                        <IconText type="like-o" text="156" />, 
                                        <IconText type="message" text="2" />]}
                            >
                            {item.content}
                            </List.Item>
                        </Link>
                    )}
                />
             </InfiniteScroll>
            </div>
        )
    }

}

export default Professor;

