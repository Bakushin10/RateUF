import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Grid } from 'react-bootstrap';
import styled from 'styled-components';

const HomeSign = styled.h1`
    color:#42f4dc;
    text-align: center;
`

export default class Home extends React.Component{


    render(){
        return(
            <div>
                <HomeSign>
                    Home
                </HomeSign>
                <div>
                    <Grid>
                        <Row>
                            <Col xs={6} md={4}>
                            <Link to="/Add">
                                <Button >Form</Button>
                            </Link>
                            </Col>
                            <Col xs={6} md={4}>
                            <Link to="/Add">
                                <Button >also Form</Button>
                            </Link>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}