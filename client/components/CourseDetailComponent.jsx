import React from 'react';
import Spinner from './Spinner';
import {Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis} from 'recharts';
import { List, Icon, Card } from 'antd';
import { ShowArrays } from './commonJS';

export const GetMessageOrGraph = (hasReview, dataloaded, courseCode, major, data) =>{
    if(!dataloaded){
      return <Spinner/>;
    }else if(dataloaded && !hasReview){
      return(
          <Card style={{ width: 500 }} hidden={hasReview}>
            <p> Be the first one to review ! </p>
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

  export const GetReview = (hasReview, review) =>{
    if(hasReview){
        return(
            <List
            className="demo-loadmore-list"
            // loading={loading}
            itemLayout="horizontal"
            // loadMore={loadMore}
            dataSource={review}
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
              </List.Item>
            )}
          />
        )
    }
}