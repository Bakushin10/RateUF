import React from 'react';
import Spinner from '../utility/Spinner';
import {Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis} from 'recharts';
import { List, Icon, Card } from 'antd';
import { ShowArrays } from '../utility/commonJS';
import Commnet from '../utility/ReviewCommnet';

export const GetMessageOrGraph = (hasReview, dataloaded, courseCode, major, data) =>{
    if(!dataloaded){
      return <Spinner/>;
    }else if(dataloaded && !hasReview){
      return(
          <Card style={{ width: '30rem', backgroundColor:'#3399ff', opacity:'0.5' }} hidden={hasReview}>
            <div className= "success-text"> Be the first to review! </div>
          </Card>
      )
    }else{
      return(
        <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={data}>
        <Radar name= { courseCode } dataKey="prof" stroke="#e858bf" fill="#e858bf" fillOpacity={0.6}/>
        <Radar name= { major + " Professors Average"}exoerience dataKey="average" stroke="#4e42f4" fill="#4e42f4" fillOpacity={0.6}/>
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
          <div className="hold-reviews">
            {/* <div className="hold-categories">
              <div className="hold-tookwith">Took Course With</div>
              <div className="hold-knowbefore">Should Know Before Course</div>
              <div className="hold-howsclass">How is the Course?</div>
              <div className="hold-extracomment">Comment</div>
            </div> */}
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
                  <div className="this-overall">
                    Overall Experience:
                    <br/>
                    { (item.overallExpe) } / 100
                  </div>
                  <br/>
                  <div className="this-difficulty">
                    Level of Difficulty:
                    <br/>
                    { (item.levelOfDiffculty) } / 100
                  </div>
                </div>

                <div className="this-review-comments">
                  <div className="this-tookwith">
                    Took With: 
                    <br/>{item.whoTookWith}
                  </div>
                  <br/>
                  <div className="this-knowbefore">
                     Know Before: { ShowArrays(item.knowBeforeCourse) }
                  </div>
                  <br/>
                  <div className="this-howsclass">
                    Class Overview:  { ShowArrays(item.howIsTheClass) }
                  </div>
                  <div className="this-review-extracomment">
                  Comment:
                  <List.Item.Meta
                  // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  //title={<a href="https://ant.design">{item.name.last}</a>}
                  description = {item.extraComment}
                  />
                  </div>
                </div>
                <br/>
                <div className="this-commnet">
                
                <Commnet name = {props.courseCode} major = {props.major} id = {item._id} type = {"course"}/>
                </div>
              </List.Item>
              </div>
            )}
          />
          </div>
        )
    }
}