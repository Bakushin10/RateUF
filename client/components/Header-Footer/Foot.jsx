import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

export default class Foot extends React.Component {
  render() {
    return (
      <Layout>
        <Footer theme="dark" style={{ textAlign: 'center', lineHeight:'2rem', width:'100%', bottom:'0', position:'relative' }}>
        <a href="/#">
        <img src="/css/img/favicon1.png" className="foot-pic" /> 
        </a>
        </Footer>
      </Layout>
    );
  }
}
