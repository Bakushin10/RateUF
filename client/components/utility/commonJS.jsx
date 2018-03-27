import React from 'react';
import { Icon, Alert} from 'antd';
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
            <Icon type="meh-o" style={{ fontSize: 15, color: '#08c', fontColor: 'black'}} />
              <div>good</div>
          </div>
        ),
        100: (
          <div>
            <Icon type="smile-o" style={{ fontSize: 15, color: '#77f987',fontColor: 'black'}} />
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
      <div hidden={!isSuccess}>
        <Alert
          style={{ width: '60%', 'margin-left':'20%','margin-top': '1%', alignContent:'center' }}
          message="Thank you!"
          description="Your review was successfully submitted!"
          type="success"
          showIcon
          >
          {/* {
            setTimeout(function() {
              $('success-text').fadeOut.empty();
            }, 5000)
          } */}
        </Alert>
      </div>
    )
  }

  export const GetErrorMessage = (isSuccess) =>{
    return(
      <div hidden={!isSuccess}>
        <Alert
          style={{ width: '60%', 'margin-left':'20%', alignContent:'center' }}
          message="Input Error"
          type="warning"
          description="Please check your inputs again."
          type="error"
          showIcon
          >
        </Alert>
      </div>
    )
  }

  export const getEmotion = (overAllValue) =>{
    
      if(overAllValue >= 90){
        return <Icon type="smile-o" />
      }
      if(overAllValue < 90 && overAllValue >= 80){
        return <Icon type="smile" />
      }
      if(overAllValue < 80 && overAllValue >= 70){
        return <Icon type="meh-o" />
      }
      if(overAllValue < 70 && overAllValue >= 60){
        return <Icon type="frown-o" />
      }
      if(overAllValue < 60){
        return <Icon type="frown" />
      }
  }
