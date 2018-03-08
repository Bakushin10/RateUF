import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';
import { List, Slider } from 'antd';
import styled from 'styled-components';
import { GetSliderMark } from './commonJS';
import Spinner from './Spinner';

const ProfessorName = styled.h5`
  color: #878fad;
  padding-top: 15px;
  padding-left: 30px;
`;

export const ProfessorList = (professorToShow, loading, hasMore, handleInfiniteOnLoad, dataloaded) =>{
    
    if(!dataloaded){
        return <Spinner />
    }else{
        const pagination = {
            pageSize: 10,
            current: 1,
            total: professorToShow.length,
            onChange: () => {}
          };
        return (
            
            <InfiniteScroll
                className="demo-infinite-container"
                initialLoad={false}
                pageStart={0}
                loadMore={handleInfiniteOnLoad}
                hasMore={!loading && hasMore}
                useWindow={false}
            >
            <List
            itemLayout="vertical"
            size="large"
            //pagination={pagination}
            dataSource={professorToShow}
            renderItem={item => (
                <Link to={`/ProfessorDetails/${item.major}/${item._id}/${item.name}`}>
                    <ProfessorName>{item.name}</ProfessorName>
                    <Slider
                        className="ant-slider-disabled" /*.ant-slider-disabled*/
                        value={item.overview}
                        disabled={true}
                        marks={GetSliderMark()}
                    />
                    <List.Item
                    xs={9}
                    md={9}
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