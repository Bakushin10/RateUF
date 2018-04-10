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
  background-color: #f5f5f5;
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
                {/* <InfiniteScroll className = "demo-infinite-container table"
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
                                            {getNumberOfReviews(item.courseCode, reviewForAllCourses)}
                                        </CourseName>
                                    </Link>
                                </div>
                            )}
                        />
                    </div>
                </InfiniteScroll> */}
                <InfiniteScroll
                className="demo-infinite-container table"
                initialLoad={false}
                pageStart={0}
                loadMore={handleInfiniteOnLoad}
                hasMore={!loading && hasMore}
                useWindow={false}
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
                            <Col span={4}>{ getEmotion(item.overview) } </Col>
                            <Col span={4}>{item.overview} / 100 </Col>
                            <Col span={4}>{getNumberOfReviews(item.courseCode, reviewForAllCourses)}</Col>
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
            <div>Number of review : {selectedCourse[0].review.length} </div>
        )
    }else{
        return(
            <div>Number of review : 0 </div>
        )
    }
}