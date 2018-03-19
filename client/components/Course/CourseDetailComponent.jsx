import React from 'react';
import Spinner from '../utility/Spinner';
import {Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis} from 'recharts';
import { List, Icon, Card } from 'antd';
import { ShowArrays } from '../utility/commonJS';
import Commnet from '../utility/reviewCommnet';

export const GetMessageOrGraph = (hasReview, dataloaded, courseCode, major, data) =>{
    if(!dataloaded){
      return <Spinner/>;
    }else if(dataloaded && !hasReview){
      return(
          <Card style={{ width: '30rem', backgroundColor:'lightblue', opacity:'0.5' }} hidden={hasReview}>
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
            <List
            className="demo-loadmore-list"
            // loading={loading}
            itemLayout="horizontal"
            // loadMore={loadMore}
            dataSource={props.reviews}
            renderItem={item => (
              <List.Item actions={[<Icon type="like" />, <Icon type="dislike" />]}>
                <List.Item.Meta
                  // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  //title={<a href="https://ant.design">{item.name.last}</a>}
                  description = {item.extraComment}
                />
                <div>
                    knowBeforeCourse:
                    { ShowArrays(item.knowBeforeCourse) }
                </div>
                <div>
                    howIsTheClass:
                    { ShowArrays(item.howIsTheClass) }
                </div>
                <div>
                    Prof : 
                    {item.whoTookWith}
                </div>
                <Commnet name = {props.courseCode} major = {props.major} id = {item._id} type = {"course"}/>
              </List.Item>
            )}
          />
        )
    }
}