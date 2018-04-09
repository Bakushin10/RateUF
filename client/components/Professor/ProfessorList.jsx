import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';
import { List, Slider, Table } from 'antd';
import styled from 'styled-components';
import { GetSliderMark, getEmotion } from '../utility/commonJS';
import Spinner from '../utility/Spinner';

const ProfessorName = styled.h5`
  color: black;
  padding-top: 15px;
  padding-left: 30px;
`;

export const ProfessorList = (professorToShow, loading, hasMore, handleInfiniteOnLoad, dataloaded) =>{
    
    if(!dataloaded){
        return <Spinner />
    }else{
        const columns = [{
            title: 'Professor Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <Link to={`/ProfessorDetails/{major}/{name}`}>{text}</Link>, 
          }, {
            title:'Department',
            dataIndex:'major',
            key:'major',
          }, {
            title: 'Rating',
            dataIndex: 'overview',
            key: 'overview',
          }, {
            title: 'Emotion',
            dataIndex: '{getEmotion(overview)}',
            key: 'emotion',
          }];

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
            {/* 
            <Table
            itemLayout="vertical"
            size="small"
            pagination={pagination}
            dataSource={professorToShow}
            renderItem={item => (
                <Link to={`/ProfessorDetails/${item.major}/${item.name}`}>
                    <ProfessorName style={{fontSize:'1rem', textAlign:'center'}}>
                    <div className="list-rating">
                        <div>{item.name}</div>
                        <div className="emo">{ getEmotion(item.overview) } </div>
                        <div className="grade">{item.overview} / 100 </div>
                    </div>
                    </ProfessorName>
                    
                    <Table.Item
                    xs={9}
                    md={9}
                    key={item.id}
                    >
                    <Table.Item.Meta />
                    </Table.Item>
                </Link>
            )}
            />*/}
            <Table dataSource={professorToShow} columns={columns} 
                   
            />
        </InfiniteScroll> 

        </div>
        )
    }
} 