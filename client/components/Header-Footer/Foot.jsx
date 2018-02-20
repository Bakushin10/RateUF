import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

export default class Foot extends React.Component {
  render() {
    return (
      <Layout>
        <Footer className="foott">#ItsRateUF ©2018 </Footer>
      </Layout>
    );
  }
}
