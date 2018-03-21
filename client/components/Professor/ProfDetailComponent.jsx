import React from 'react';
import Spinner from '../utility/Spinner';
import {Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis} from 'recharts';
import { List, Icon, Card, Button } from 'antd';
import { ShowArrays } from '../utility/commonJS';
import Commnet from '../utility/ReviewCommnet';

export const GetMessageOrGraph = (hasReview, props, data) =>{
    if(!props.dataloaded){
      return <Spinner/>;
    }else if(props.dataloaded && !hasReview){
      return(
          <Card style={{ width: 500 }} hidden={hasReview}>
            <p> Be the first one to review ! </p>
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
                  Would you take this professor again <p>{item.wouldTakeAgain}</p>
                </div>
                <div>
                  Course took with <p>{item.courseTakenFor}</p>
                </div>
                <div>
                  {/* show the HowIsTheProfessor Array */}
                  howIsTheProfessor : 
                  { ShowArrays(item.howIsTheProfessor) }
                </div>
                <Commnet name = {props.profName} major = {props.major} id = {item._id} type = {"professor"}/>
              </List.Item>
            )}
          />
        )
    }
}