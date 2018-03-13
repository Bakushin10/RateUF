import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';
import { List, Slider } from 'antd';
import styled from 'styled-components';
import { GetSliderMark } from '../utility/commonJS';
import Spinner from '../utility/Spinner';

const CourseName = styled.h5`
  color: #878fad;
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
        <InfiniteScroll className = "demo-infinite-container"
            initialLoad={false}
            pageStart={0}
            loadMore={ handleInfiniteOnLoad}
            hasMore={! loading && hasMore}
            useWindow={false}
        >
        <List 
            itemLayout="vertical"
            size="large"
            pagination={pagination}
            dataSource={ courseToShow }
            renderItem={item => (
            <Link to={`/ClassDetails/${item.major}/${item.courseCode}`}>
                <CourseName>
                    <div>{item.courseCode}</div>
                    <div>{item.courseName}</div>
                </CourseName>
                <Slider className = "ant-slider-disabled" /*.ant-slider-disabled*/
                    value={item.overview} 
                    disabled = {true} 
                    marks={GetSliderMark()}
                />
                <List.Item 
                    xs = {9} md = {9}
                    key={item.id}
                >
                <List.Item.Meta />
            </List.Item>
        </Link>
        )}
    />
</InfiniteScroll>  
        )
    }
}