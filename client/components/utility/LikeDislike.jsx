import React from 'react';
import { Button, Row, Col } from 'antd';
import axios from 'axios';

class LikeDislike extends React.Component{

    constructor(){
        super();
        this.state ={
            thumbsUp : 0,
            thumbsDown : 0
        }
        this.thumbsDownOnClick = this.thumbsDownOnClick.bind(this);
        this.thumbsUpOnClick = this.thumbsUpOnClick.bind(this);
    }

    componentDidMount(){
        let self = this;
        self.setState({thumbsUp : self.props.thumbsUp})
        self.setState({thumbsDown : self.props.thumbsDown})
    }
    
    thumbsUpOnClick(){
        let self = this;
        axios.get('/updateThumbs',{
            params:{
              id : this.props.id,
              major: this.props.major,
              condition : "thumbsUp"
            }
        }).then(function(response) {
            //update the state
            self.setState({thumbsUp : response.data.thumbsUp})
            self.setState({thumbsDown : response.data.thumbsDown})
        })
    }

    thumbsDownOnClick(){
        let self = this;
        axios.get('/updateThumbs',{
            params:{
              id : this.props.id,
              major: this.props.major,
              condition : "thumbsDown"
            }
        }).then(function(response) {
            //console.log(response.data);
            //update the state
            self.setState({thumbsUp : response.data.thumbsUp})
            self.setState({thumbsDown : response.data.thumbsDown})
        })
    }

    render(){
        return(
            <Row>
                <Col>
                    <Button onClick={this.thumbsUpOnClick} type="primary" shape="circle" icon="like"></Button>
                    <div>
                        {this.state.thumbsUp}
                    </div>
                </Col>
                <Col>
                    <Button onClick={this.thumbsDownOnClick} type="primary" shape="circle" icon="dislike"></Button>
                    <div>
                        {this.state.thumbsDown}
                    </div>
                </Col>
            </Row>
        )
    }
}

export default LikeDislike;