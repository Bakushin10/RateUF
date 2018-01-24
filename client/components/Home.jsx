import React from 'react';
import styled from 'styled-components';


const HomeSign = styled.h1`
    color:#42f4dc;
`

export default class Home extends React.Component{


    render(){
        return(
            <div>
                <HomeSign>
                    Home
                </HomeSign>
            </div>
        );
    }
}