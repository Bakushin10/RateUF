import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';
import { List, Slider } from 'antd';
import styled from 'styled-components';
import { GetSliderMark, getEmotion } from '../utility/commonJS';
import Spinner from '../utility/Spinner';

const CourseName = styled.h5`
  color: black;
  padding-top: 15px;
  padding-left: 30px;
`;

export const CourseList = (courseToShow, loading, hasMore, handleInfiniteOnLoad, dataloaded) =>{

    if(!dataloaded){
        return <Spinner />
    }else{
        const pagination = {
            pageSize: 10,
            current: 1,
            total: courseToShow.length,
            onChange: () => {}
        }
        ;
        return(
            <div>
        <InfiniteScroll className = "demo-infinite-container table"
            initialLoad={false}
            pageStart={0}
            loadMore={ handleInfiniteOnLoad}
            hasMore={! loading && hasMore}
            useWindow={false}
        >
        <div className="hold-list">
        <List 
            itemLayout="vertical"
            size="small"
            pagination={pagination}
            dataSource={ courseToShow }
            renderItem={item => (
            <div className="this-review">
            <Link to={`/ClassDetails/${item.major}/${item.courseCode}`}>
                <CourseName style={{fontSize:'1.25rem', textAlign:'center'}}>
                    <div >{item.courseCode}</div>
                    <div className="list-rating">
                        <div>{item.courseName}</div>
                        <div className="emo">{ getEmotion(item.overview) } </div>
                        <div className="grade">{item.overview} / 100 </div>
                    </div>
                </CourseName>
                
                
                <List.Item 
                    xs = {9} md = {9}
                    key={item.id}
                >
                
                <List.Item.Meta />
            </List.Item>
        </Link>
        </div>
        )}
    />
    </div>
</InfiniteScroll>  
</div>
        )
    }
}