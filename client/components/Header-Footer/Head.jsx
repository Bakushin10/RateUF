import React from 'react';
import { Layout, Menu, Dropdown, Icon } from 'antd';
const { Header } = Layout;

export default class Head extends React.Component {
  render() {
    return (
      <Layout>
          <Menu theme="dark" mode="horizontal" style={{ lineHeight: '5rem' }}>
          
          
            <a className="special-text" href="/#">
              RateUF
            </a>
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
              <a href="/#/CSPrereq" className="items">Degree Outline</a>
            </Menu.Item>
          </Menu>
      </Layout>
    );
  }
}
