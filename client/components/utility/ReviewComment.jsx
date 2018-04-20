import React from 'react';
import axios from 'axios';
import { ShowCommentArrays, GetLabel } from '../utility/commonJS';
import { Button, Form, Input, Grid, Row } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
const querystring = require('querystring');


class ReviewComment extends React.Component {
    constructor() {
        super();
        this.state = {
            buttonMessage : 'Reply',
            comment : '',
            showComment : true,
            commnetToShow : []
        };
        this.extraCommentOnChange = this.extraCommentOnChange.bind(this);
        this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.commentToShow = this.commentToShow.bind(this);
    }

    componentDidMount(){
        let self = this;
        // console.log("major")
        // console.log(this.props.major)
        // console.log(this.props.name)
        
            /*
            
            DB error when this.props not passed correctly 
        
        
            */
        if(this.props.major !== null && this.props.major !== 'undefined'){
            if(this.props.type === "professor"){
                axios.get('/getProfComment',{
                    params:{
                        id : this.props.id,
                        major : this.props.major,
                        name : this.props.name
                    }
                }).then(function(response) {
                    self.commentToShow(response.data[0].comment)
                });
            }else{
                axios.get('/getCourseComment',{
                    params:{
                        id : this.props.id,
                        major : this.props.major,
                        name : this.props.name
                    }
                }).then(function(response) {
                    self.commentToShow(response.data[0].comment)
                });
            }
        }

    }

    commentToShow(comment){
        for(var i = 0;i < comment.length ;i++){
            if(this.props.id === comment[i].reviewID){
                this.setState({commnetToShow : this.state.commnetToShow.concat([comment[i].comment])})
            }
        }
    }
    
    extraCommentOnChange(e) {
        this.setState({ comment: e.target.value });
    }

    handleSubmit(e){
        if(this.state.comment !== '' || this.state.commnet !== 'undefined'){
            if(this.props.type === "professor"){
                axios.post('/updateProfessorComment',
                querystring.stringify({
                  name : this.props.name, //identify the which prof to update
                  id : this.props.id, //identify which review to update
                  major : this.props.major,
                  comment : this.state.comment,
                }),
                {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                }
              );
            }else{
                axios.post('/updateCourseComment',
                querystring.stringify({
                  name : this.props.name, //identify the which prof to update
                  id : this.props.id, //identify which review to update
                  major : this.props.major,
                  comment : this.state.comment,
                }),
                {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                }
              );
            }//end of else
            this.setState({buttonMessage: 'Reply'})
            this.setState({comment: ''})
            this.setState({showComment : true})
        }
    }

    handleClick(e) {
        if(this.state.showComment){
            this.setState({buttonMessage: 'Hide Reply'})
            this.setState({showComment : false})
        }else{
            this.setState({buttonMessage: 'Reply'})
            this.setState({showComment : true})
        }
    }

    render(){
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 9 }
        };
        const showComment = this.state.showComment
        return(
            <div className="reply-commnet">
                <div>
                    <Button type="primary" ghost onClick={this.handleClick}>
                        {this.state.buttonMessage}
                    </Button>
                    <br/>
                    
                    <Form  hidden={showComment}>
                        <FormItem {...formItemLayout} label={ GetLabel(this.state.comment, 'Reply')}>
                        <TextArea
                            type="text"
                            value={this.state.comment}
                            placeholder="Enter Reply"
                            autosize
                            onChange={this.extraCommentOnChange}
                        />
                        </FormItem>
                        <Button type="primary"  onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </div>
                <br/>
                <div>
                  {/* <div className="underline"> Replies: </div> */}
                    { ShowCommentArrays(this.state.commnetToShow) }
                </div>
          </div>
        ) //end of return
    } //end of render
}

export default ReviewComment;