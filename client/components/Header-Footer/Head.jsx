import React from 'react';
import { Layout, Menu, Dropdown, Icon } from 'antd';
const { Header } = Layout;

export default class Head extends React.Component {
  render() {
    return (
      <Layout>
        <Header className="head">
          <a className="special-text" href="/#">
            RateUF
          </a>
          <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
            <Menu.Item key="prof">
              <a href="/#/Professor" className="items">
                Professors
              </a>
            </Menu.Item>

            <Menu.Item key="class">
              <a href="/#/Class" className="items">
                Classes
              </a>
            </Menu.Item>
            <Menu.Item key="degree" className="items">
              <a className="items">Degree Outline</a>
            </Menu.Item>
          </Menu>
        </Header>
      </Layout>
    );
  }
}