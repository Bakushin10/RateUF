import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';
import { Row, Col, List, Slider, Table } from 'antd';
import styled from 'styled-components';
import { GetSliderMark, getEmotion } from '../utility/commonJS';
import Spinner from '../utility/Spinner';

const ProfessorName = styled.h5`
  color: black;
  padding-top: 0.75rem;
  padding-bottom: 1rem;
  padding-left: 30px;
  font-size: 1rem; 
  border-bottom: double;
  text-align: center;

  &:hover{
    background-color: #e6f7ff;
  }
`;

export const ProfessorList = (professorToShow, loading, hasMore, reviewForAllProfs, handleInfiniteOnLoad, dataloaded) =>{
    if(reviewForAllProfs.length === 0){
        return <Spinner />
    }else{
        const pagination = {
            pageSize: 10,
            current: 1,
            total: professorToShow.length,
            onChange: () => {}
          };
        return (
            <div>
            <Row className="list-header">
                <Col span={6}>Professor Name </Col>
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
                dataSource={professorToShow}
                renderItem={item =>(
                <Link to={`/ProfessorDetails/${item.major}/${item.name}`}>
                <ProfessorName>
                    <Row className="list-item">
                        <Col span={6}>{item.name}</Col>
                        <Col span={8}>{ getEmotion(item.overview) } {getOverview(item.overview)}</Col>
                        <Col span={6}>{getNumberOfReviews(item.name, reviewForAllProfs)}</Col>
                    </Row>
                </ProfessorName>
                </Link>
                )}
            /> 
        </InfiniteScroll> 

        </div>
        )
    }
}

function getNumberOfReviews(name,reviewForAllProfs){
    const selectedProf = reviewForAllProfs.filter(prof => {
        if (`${prof.name}`.toUpperCase().indexOf(name.toUpperCase()) >= 0) {
          return prof;
        }
      });

    if(selectedProf.length > 0){
        return(
            <div className="profRateButton"> {selectedProf[0].review.length} </div>
        )
    }else{
        return(
            <div className="profRateButton"> 0 </div>
        )
    }
}

function getOverview(overview){
    if(overview > 0){
        return <span>{overview} / 100</span>;
    }
}
