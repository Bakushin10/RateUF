import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';
import { List, Slider } from 'antd';
import styled from 'styled-components';
import { GetSliderMark, getEmotion } from '../utility/commonJS';
import Spinner from '../utility/Spinner';

const ProfessorName = styled.h5`
  color: black;
  padding-top: 15px;
  padding-left: 30px;
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
                <InfiniteScroll
                    className="demo-infinite-container table"
                    initialLoad={false}
                    pageStart={0}
                    loadMore={handleInfiniteOnLoad}
                    hasMore={!loading && hasMore}
                    useWindow={false}
                >
                <div className="hold-list">
                    <List
                        itemLayout="vertical"
                        size="small"
                        pagination={pagination}
                        dataSource={professorToShow}
                        renderItem={item => (
                            <div className="this-review">
                                <Link to={`/ProfessorDetails/${item.major}/${item.name}`}>
                                    <ProfessorName style={{fontSize:'1.25rem', textAlign:'center'}}>
                                        <div className="list-rating">
                                            <div>{item.name}</div>
                                            <div className="emo">{ getEmotion(item.overview) } </div>
                                            <div className="grade">{item.overview} / 100 </div>
                                        </div>
                                        {getNumberOfReviews(item.name, reviewForAllProfs)}
                                    </ProfessorName>
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

function getNumberOfReviews(name,reviewForAllProfs){
    const selectedProf = reviewForAllProfs.filter(prof => {
        if (`${prof.name}`.toUpperCase().indexOf(name.toUpperCase()) >= 0) {
          return prof;
        }
      });

    if(selectedProf.length > 0){
        return(
            <div>Number of review : {selectedProf[0].review.length} </div>
        )
    }else{
        return(
            <div>Number of review : 0 </div>
        )
    }
}
