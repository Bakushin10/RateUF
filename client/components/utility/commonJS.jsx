import React from 'react';
import { Icon, Card } from 'antd';
import styled from 'styled-components';
import Spinner from './Spinner';

const WarningOn = styled.span`
  color: #fc2f4e;
`;
const WarningOff = styled.span`
  color: #6be594;
`;

 export const GetSliderMark = () =>{
    return(
      {
        0: (
          <div>
            <Icon type="frown-o" style={{ fontSize: 15, color: '#db0f0f', fontColor: 'black' }} />
              <div>meh</div>
          </div>
        ),
        50: (
          <div>
            <Icon type="meh-o" style={{ fontSize: 15, color: '#08c', fontColor: 'black' }} />
              <div>good</div>
          </div>
        ),
        100: (
          <div>
            <Icon type="smile-o" style={{ fontSize: 15, color: '#77f987',fontColor: 'black' }} />
              <div>excellent</div>
          </div>
        )
      }
    )
  }

  export const ShowArrays = (items) =>{
    var rows = []  
    for(let i = 0;i<items.length ;i++){
        rows.push(<div>{ items[i] }</div>)
      }
    return rows;
  }

  export const GetLabel = (val, tag) => {
    if (val === '' || val === 0 || val.length === 0) {
      return <WarningOn> *{tag} </WarningOn>;
    } else {
      return <WarningOff> {tag} </WarningOff>;
    }
  }

  export const GetSuccessMessage = (isSuccess) =>{
    return(
      <Card style={{ width: '30rem', backgroundColor:'#5cd65c', opacity:'0.5', alignContent:'center' }} hidden={!isSuccess}>
        <div className="success-text">
          <Icon type="check-circle-o"  /> Thank you! Your review was successfully submitted!
        </div>
        {
          setTimeout(function() {
            $('success-text').fadeOut.empty();
          }, 5000)
        }
      </Card>
    )
   
  } 


