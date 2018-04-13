import React from 'react';
import { Icon, Alert, Card} from 'antd';
import styled from 'styled-components';
import Spinner from './Spinner';

const WarningOn = styled.span`
  color: #c90825;
`;
const WarningOff = styled.span`
  color: #14bc0f;
`;

 export const GetSliderMark = () =>{
    return(
      {
        0: (
          <div>
            <Icon type="frown-o" style={{ fontSize: 18, color: '#db0f0f', fontColor: 'black' }} />
              <div>bad</div>
          </div>
        ),
        50: (
          <div>
            <Icon type="meh-o" style={{ fontSize: 18, color: '#f7cd16', fontColor: 'black'}} />
              <div>meh</div>
          </div>
        ),
        100: (
          <div>
            <Icon type="smile-o" style={{ fontSize: 18, color: '#14bc0f',fontColor: 'black'}} />
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

  export const ShowCommentArrays = (items) =>{
    var rows = []
    // margin-left: 10px;
    // margin-right: - 5px;
    
    for(let i = 0;i<items.length ;i++){
        rows.push(<div className="hold-commnets">{ items[i] }</div>)
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
        <p className = "errorMessage">
          <Alert
            style={{ width: '60%', 'margin-left':'20%', alignContent:'center' }}
            message="Input Error"
            type="warning"
            description="Please check your inputs again."
            type="error"
            showIcon
            >
          </Alert>
        </p>
      </div>
    )
  }

  export const getEmotion = (overAllValue) =>{
    
      if(overAllValue == 0){
        return <div> No Reviews</div>
      }
      if(overAllValue >= 80){
        return <Icon type="smile-o" />
      }
      if(overAllValue < 80 && overAllValue >= 60){
        return <Icon type="meh-o" />
      }
      if(overAllValue < 60 && overAllValue >0){
        return <Icon type="frown-o" />
      }
  }

  export const getHexColor = (value) =>{
    var r = Math.floor(value * 2.55);
		var g = Math.floor(255 - (value * 2.55));
    var b = 0;
    
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    
    r = (r.length === 1) ? '0' + r : r;
    g = (g.length === 1) ? '0' + g : g;
    b = (b.length === 1) ? '0' + b : b;

    return '#' + g  + r  + b ;
  }

  export const getPreviousCourse = (major, items, category) =>{
    var rows = []
    if(items.length == 0 ){
      return(
        ///ClassDetails/${this.props.match.params.major}/${this.state.redirectTo
        <p>
          <Card >
            <h5 className = "previousCard">No records to show</h5>
          </Card>
        </p>
      )
    }else if (category === "professor"){
      for(let i = 0;i<items.length ;i++){
        const path = "#/ClassDetails"+"/"+major+"/"+items[i].courseCode
        rows.push(
          <a href = {path}>
            <p>
              <Card>
                <h5 className = "previousCard">{items[i].courseCode}</h5>
                {checkOVerView(items[i].overview)}
              </Card>
            </p>
          </a>
          )
        }
    }else{
      for(let i = 0;i<items.length ;i++){
        const path = "#/ProfessorDetails"+"/"+major+"/"+items[i].name
        rows.push(
          <a href = {path}>
            <p>
              <Card>
                <h5 className = "previousCard">{items[i].name}</h5>
                {checkOVerView(items[i].overview)}
              </Card>
            </p>
          </a>
          )
        }
    }
    return rows;
  }

  export const getRating = (score) => {
    // score is out of 100
    // convert the score to scale of 0-5 for rating
    return (score/20).toFixed(1);
  }

  export const getDepartment = (department) => {
    if(department == "CS"){
      return <span>Computer Science</span>
    }
    if(department == "MATH"){
      return <span>Mathematics</span>
    }
    if(department == "ECE"){
      return <span>Computer Engineering</span>
    }
  }

  export const checkOVerView = (overview) =>{
    if(overview == 0){
      return(
        <p> No reviews</p>
      )
    }else{
      return <p> {overview} /100 </p>
    }
  }