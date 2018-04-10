import React from 'react';
import { Button } from 'antd';

class LikeDislike extends React.Component{

    render(){
        return(
            <p>
                <Button type="primary" shape="circle" icon="like"></Button>, 
                <Button type="primary" shape="circle" icon="dislike"></Button> 
            </p>
        )
    }

}

export default LikeDislike;