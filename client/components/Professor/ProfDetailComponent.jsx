import React from 'react';
import Spinner from '../utility/Spinner';
import Gauge from 'react-svg-gauge';
import { List, Icon, Card, Button, Row, Col } from 'antd';
import { ShowArrays, getEmotion, getHexColor } from '../utility/commonJS';
import Commnet from '../utility/ReviewCommnet';
import LikeDislike from '../utility/LikeDislike'

export const GetMessageOrGraph = (ProfFields, props) =>{
    if(!props.dataloaded){
      return <Spinner/>;
    }else if(props.dataloaded && !ProfFields.hasReview){
      return(
          <Card style={{ width: '30rem', backgroundColor:'lightblue', opacity:'0.5' }} hidden={ProfFields.hasReview}>
            <div className="success-text"> Be the first one to review ! </div>
          </Card>
      )
    }else{
      var overAllExpeColor = getHexColor(props.overAllExpe);
      var levelOfDiffColor = getHexColor(ProfFields.levelOfDiff);
      var CommOfIdeaExpeColor = getHexColor(ProfFields.CommOfIdea);
      var FaciliOfLearningExpeColor = getHexColor(ProfFields.FaciliOfLearning);
      return(
        <div>
          <Row type="flex" justify="space-around" align="middle">
            <Gauge  value={parseFloat(props.overAllExpe).toFixed(1)} width={250} height={180} color = {overAllExpeColor} label="Overall" />
          </Row>

          {/* <Row type="flex" justify="space-around" align="middle">
            <Col span={4}>
              <Gauge value={parseFloat(ProfFields.levelOfDiff).toFixed(1)} width={180} height={125} color = {levelOfDiffColor} label="Level of Difficulty" />
            </Col>
            <Col span={4}>
              <Gauge value={parseFloat(ProfFields.CommOfIdea).toFixed(1)} width={180} height={125} color = {CommOfIdeaExpeColor} label="Communication" />
            </Col>
            <Col span={4}>
              <Gauge value={parseFloat(ProfFields.FaciliOfLearning).toFixed(1)} width={180} height={125} color = {FaciliOfLearningExpeColor} label="Learning Experience" />
            </Col>
          </Row> */}


          <Row type="flex" justify="space-around" align="middle">
            <Col span={4}>
              <Card style={{ width: 300 }}>
                <h2>Level of Difficulty</h2>
                {parseFloat(ProfFields.levelOfDiff).toFixed(1)}
              </Card>
            </Col>

            <Col span={4}>
              <Card style={{ width: 300 }}>
                <h2>Communication</h2>
                {parseFloat(ProfFields.CommOfIdea).toFixed(1)}
              </Card>
            </Col>

            <Col span={4}>
              <Card style={{ width: 300 }}>
                <h2>Learning Experience</h2>
                {parseFloat(ProfFields.FaciliOfLearning).toFixed(1)}
              </Card>
            </Col>
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
            // loading={loading}
            itemLayout="horizontal"
            // loadMore={loadMore}
            dataSource={props.reviews}
            renderItem={item => (
              <div className="this-review">
              <List.Item actions={[
                //  <Button type="primary" shape="circle" icon="like" >
                //   </Button>, 
                // <Button type="primary" shape="circle" icon="dislike" >
                // </Button> 
              ]}
              >
                <LikeDislike/>
                <div className="this-review-ratings">
                  <div className="this-overall">
                    <div className="underline">Overall Experience: </div>
                    { getEmotion(item.overallExpe) }      {(item.overallExpe)} / 100
                  </div>
                  <br/>
                  <div className="this-difficult">
                    <div className="underline">Level of Difficulty: </div>
                    { getEmotion(item.levelOfDiffculty) }      {(item.levelOfDiffculty)} / 100
                  </div>
                  <br/>
                  <div className="this-toookwith">
                    <div className="underline">Course: </div>
                    {item.courseTakenFor}
                  </div>
                </div>
                  <div className="this-review-comments">
                    <div className="this-howsprof">
                      <div className="underline">How is the Professor: </div> 
                      { ShowArrays(item.howIsTheProfessor) }
                    </div>
                    <br/>
                    <div className="this-learning">
                      <div className="underline">Faciliation of Learning: </div>
                      {(item.facilitationOfLearning)} / 100
                    </div>
                    <br/>
                    <div className="this-communication">
                    <div className="underline">Communication of Ideas: </div>
                    {(item.communicationOfIdeas)} / 100
                    </div>
                    <br/>
                    <div className="this-takeagain">
                      <div className="underline">Would take again: </div>
                      {(item.wouldTakeAgain)}
                    </div>
                  </div>
                
                  <div className="this-review-comments">
                    <div className="this-tips">
                    <div className="underline">Tips for Success: </div>
                      {ShowArrays(item.tipsForSuccess)}
                    </div>

                  </div>
                
                  <div className="this-review-commentscomments">
                    <div className="this-review-extracomment">
                      <div className="underline">User Comment:</div>
                      <List.Item.Meta
                      // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      //title={<a href="https://ant.design">{item.name.last}</a>}
                      
                      description = {item.extraComment}
                      />
                    </div>
                    {/* <div className="hold-commnets"> */}
                      <Commnet name = {props.profName} major = {props.major} id = {item._id} type = {"professor"}/>
                    {/* </div> */}
                  </div>
              </List.Item>
              </div>
            )}
          />
          </div>
          </div>
        )
    }
}