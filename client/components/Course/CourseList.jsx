import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';
import { Row, Col, List, Slider } from 'antd';
import styled from 'styled-components';
import { GetSliderMark, getEmotion } from '../utility/commonJS';
import Spinner from '../utility/Spinner';

const CourseName = styled.h5`
color: black;
padding-top: 0.75rem;
padding-bottom: 1rem;
padding-left: 30px;
font-size: 1rem; 
border-bottom: double;
text-align: center;
&:hover{
  background-color: #e6f7ff;
`;

export const CourseList = (courseToShow, loading, hasMore, reviewForAllCourses, handleInfiniteOnLoad, dataloaded) =>{

    if(reviewForAllCourses.length === 0){
        return <Spinner />
    }else{
        const pagination = {
            pageSize: 10,
            current: 1,
            total: courseToShow.length,
            onChange: () => {}
        };
        return(
            <div>
                <Row className="list-header">
                    <Col span={4}>Course Code</Col>
                    <Col span={6}>Course Name</Col>
                    <Col span={8}>Overview </Col>
                    <Col span={6}>Number of Reviews </Col>
                </Row>
                <InfiniteScroll
                className="demo-infinite-container table"
                initialLoad={false}
                pageStart={0}
                loadMore={handleInfiniteOnLoad}
                hasMore={!loading && hasMore}
                useWindow={false}
                style={{background:'#ffffff'}}
                >
                <List
                    size="large"
                    dataSource={courseToShow}
                    renderItem={item =>(
                    <Link to={`/ClassDetails/${item.major}/${item.courseCode}`}>
                    <CourseName>
                        <Row className="list-item">
                            <Col span={4}>{item.courseCode}</Col>
                            <Col span={6}>{item.courseName}</Col>
                            <Col span={8}>{ getEmotion(item.overview) } {getOverview(item.overview)} </Col>
                            <Col span={6}>{getNumberOfReviews(item.courseCode, reviewForAllCourses)}</Col>
                        </Row>
                    </CourseName>
                    </Link>
                    )}
                /> 
                </InfiniteScroll> 

            </div>
        )
    }
}

function getNumberOfReviews(courseCode,reviewForAllCourses){
    const selectedCourse = reviewForAllCourses.filter(prof => {
        if (`${prof.courseCode}`.toUpperCase().indexOf(courseCode.toUpperCase()) >= 0) {
          return prof;
        }
      });
    if(selectedCourse.length > 0){
        return(
            <div>{selectedCourse[0].review.length} </div>
        )
    }else{
        return(
            <div> 0 </div>
        )
    }
}

function getOverview(overview){
    if(overview > 0){
        return <span>{overview} / 100</span>;
    }
}