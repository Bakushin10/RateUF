import React from 'react';
import Spinner from '../utility/Spinner';
import Gauge from 'react-svg-gauge';
import { List, Icon, Card, Row, Col} from 'antd';
import { ShowArrays, getEmotion, getHexColor } from '../utility/commonJS';
import Commnet from '../utility/ReviewCommnet';

export const GetMessageOrGraph = (ProfFields, props) =>{
    if(!props.dataloaded){
      return <Spinner/>;
    }else if(props.dataloaded && !ProfFields.hasReview){
      return(
          <Card style={{ width: '30rem', backgroundColor:'#3399ff', opacity:'0.5' }} hidden={ProfFields.hasReview}>
            <div className= "success-text"> Be the first to review! </div>
          </Card>
      )
    }else{
      var overAllExpeColor = getHexColor(props.overAllExpe);
      var levelOfDiffColor = getHexColor(ProfFields.levelOfDiff);
      return(
        <div>
          <Row type="flex" justify="space-around" align="middle">
            <Gauge value={parseFloat(props.overAllExpe).toFixed(1)} width={250} height={180} color = {overAllExpeColor}  label="Overall" />
          </Row>

          <Row type="flex" justify="space-around" align="middle">
            <Col span={4}>
              <Gauge value={parseFloat(ProfFields.levelOfDiff).toFixed(1)} width={180} height={120}  color = {levelOfDiffColor} label="Level of Difficulty" />
            </Col>
          </Row>
        </div>
      )
    }
  }

  export const GetReview = (hasReview, props) =>{
    if(hasReview){
        return(
          <div>
          <div className="hold-reviews">
            {/* <div className="hold-categories">
              <div className="hold-tookwith">Took Course With</div>
              <div className="hold-knowbefore">Should Know Before Course</div>
              <div className="hold-howsclass">How is the Course?</div>
              <div className="hold-extracomment">Comment</div>
            </div> */}
            <List
            className="demo-loadmore-list"
            // loading={loading}
            itemLayout="horizontal"
            // loadMore={loadMore}
            dataSource={props.reviews}
            renderItem={item => (
              <div>
              <div className="this-review">
              <List.Item actions={[<Icon type="like" />, <Icon type="dislike" />]}>
                <div className="this-review-ratings">
                  <div className="this-overall">
                    <div className="underline">Overall Experience: </div>
                    { getEmotion(item.overallExpe) }      { (item.overallExpe) } / 100
                  </div>
                  <br/>
                  <div className="this-difficulty">
                  <div className="underline">Level of Difficulty: </div>
                  { getEmotion(item.levelOfDiffculty) }       { (item.levelOfDiffculty) } / 100
                  </div>
                </div>

                <div className="this-review-comments">
                  <div className="this-tookwith">
                  <div className="underline"> Took With:  </div>
                    {item.whoTookWith}
                  </div>
                  <br/>
                  <div className="this-knowbefore">
                  <div className="underline"> Know Before:</div>
                   { ShowArrays(item.knowBeforeCourse) }
                  </div>
                  <br/>
                  <div className="this-howsclass">
                  <div className="underline"> Class Overview: </div>
                  { ShowArrays(item.howIsTheClass) }
                  </div>
                  </div>

                  <div className="this-review-commentscomments">
                    <div className="this-review-extracomment">
                    <div className="underline"> User Comment: </div>
                    <List.Item.Meta
                    // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    //title={<a href="https://ant.design">{item.name.last}</a>}
                    
                    description = {item.extraComment}
                    />
                    </div>
                    <br/>
                    <div className="hold-commnets">
                      <Commnet name = {props.courseCode} major = {props.major} id = {item._id} type = {"course"}/>
                    </div>
                </div>
                
              </List.Item>
              </div>
              {/*  */}
              </div>
            )}
          />
          </div>
          {/*  */}
          </div>
        )
    }
}