import React from 'react';
import Spinner from '../utility/Spinner';
import Gauge from 'react-svg-gauge';
import { List, Icon, Card, Row, Col, Rate} from 'antd';
import { ShowArrays, getEmotion, getHexColor, getRating } from '../utility/commonJS';
import ReviewComment from '../utility/ReviewComment';
import LikeDislike from '../utility/LikeDislike'

export const GetMessageOrGraph = (ProfFields, props) =>{
    if(!props.dataloaded){
      return <Spinner/>;
    }else if(props.dataloaded && !ProfFields.hasReview){
      return(
          <Card hidden={ProfFields.hasReview}>
            <div className= "success-text"> Be the first to review! </div>
          </Card>
      )
    }else{
      var overAllExpeColor = getHexColor(props.overAllExpe);
      var levelOfDiffColor = getHexColor(ProfFields.levelOfDiff);
      return(
        <div>
          <Row type="flex" justify="space-around" align="middle">
            <p>
              <Gauge value={parseFloat(props.overAllExpe).toFixed(1)} width={250} height={180} color = {overAllExpeColor}  label="Overall Experience" />
            </p>
            <p>
                <Col span={3}>
                  <Card style={{ width: 300 }}>
                    Level of Difficulty
                    <h3 className = "previousCard">{parseFloat(ProfFields.levelOfDiff).toFixed(1)}</h3>
                    <Rate disabled defaultValue={getRating(ProfFields.levelOfDiff)} disabled/>
                  </Card>
                </Col>
              </p>
          </Row>
        </div>
      )
    }
  }

  export const GetReview = (hasReview, props) =>{
    if(hasReview){
        return(
          <div>
          <div className="hold-reviews">
            <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={props.reviews}
            renderItem={item => (
              <Row className="this-review">
              <List.Item>
                <LikeDislike 
                  id = {item._id}
                  major = {props.major}
                  thumbsDown = {item.thumbsDown}
                  thumbsUp = {item.thumbsUp}
                  isProf = {"course"}
                />
                <Col span={6} className="this-review-ratings">
                <div className="this-toookwith">
                  
                    {item.whoTookWith}
                  </div>
                  <br/>
                  <div className="this-overall">
                    <div className="underline">Overall Experience: </div>
                     { (item.overallExpe) } / 100
                  </div>
                  <br/>
                  <div className="this-difficulty">
                  <div className="underline">Level of Difficulty: </div>
                  { (item.levelOfDiffculty) } / 100
                  </div>
                </Col>

                <Col span={6} className="this-review-comments">
                  
                  <br/>
                  <div className="this-knowbefore">
                  <div className="underline"> Know Before:</div>
                   { ShowArrays(item.knowBeforeCourse) }
                  </div>
                  <br/>
                  <div className="this-howsclass">
                  <div className="underline"> Class Overview: </div>
                  { ShowArrays(item.howIsTheClass) }
                  </div>
                </Col>

                  <Col span={6} className="this-review-commentscomments">
                    <div className="this-review-extracomment">
                    <div className="underline"> User Comment: </div>
                    <List.Item.Meta
                    
                    description = {item.extraComment}
                    />
                    </div>
                    <br/>
                    <div className="hold-Comments">
                      <ReviewComment name = {props.courseCode} major = {props.major} id = {item._id} type = {"course"}/>
                    </div>
                </Col>
                
              </List.Item>
              </Row>
            )}
          />
          </div>
          </div>
        )
    }
}