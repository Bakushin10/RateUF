import React from 'react';
import Spinner from '../utility/Spinner';
import {Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis} from 'recharts';
import { List, Icon, Card, Button } from 'antd';
import { ShowArrays, getEmotion } from '../utility/commonJS';
import Commnet from '../utility/ReviewCommnet';

export const GetMessageOrGraph = (hasReview, props, data) =>{
    if(!props.dataloaded){
      return <Spinner/>;
    }else if(props.dataloaded && !hasReview){
      return(
          <Card style={{ width: '30rem', backgroundColor:'lightblue', opacity:'0.5' }} hidden={hasReview}>
            <div className="success-text"> Be the first one to review ! </div>
          </Card>
      )
    }else{
      return(
        <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={data}>
        <Radar name= { props.profName } dataKey="prof" stroke="#e858bf" fill="#e858bf" fillOpacity={0.6}/>
        <Radar name= { props.major + " Professors Average"}exoerience dataKey="average" stroke="#4e42f4" fill="#4e42f4" fillOpacity={0.6}/>
        <PolarGrid />
        <Legend />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={90} domain={[0, 100]}/>
        </RadarChart>
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
              <List.Item actions={[<Icon type="like" />, <Icon type="dislike" />]}>
                <div className="this-review-ratings">
                  { getEmotion(item.overallExpe) }
                  <div className="this-overall">
                    <div className="underline">Overall Experience: </div>
                    {(item.overallExpe)} / 100
                  </div>
                  <br/>
                  <div className="this-difficult">
                    <div className="underline">Level of Difficulty: </div>
                    {(item.levelOfDiffculty)} / 100
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
                    <div className="underline"> User Comment: </div>
                    <List.Item.Meta
                    // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    //title={<a href="https://ant.design">{item.name.last}</a>}
                    
                    description = {item.extraComment}
                    />
                    </div>
                
                <br/>
                <div className="hold-commnets">
                  <Commnet name = {props.profName} major = {props.major} id = {item._id} type = {"professor"}/>
                </div>
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