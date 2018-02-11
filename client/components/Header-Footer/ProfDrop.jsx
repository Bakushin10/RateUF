import React from 'react';
import ReactDOM from 'react-dom';
import { Menu, Dropdown, Icon } from 'antd';

const ProfDrop = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="/Professor">
        Find Professor
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="/#">
        Rate Professor
      </a>
    </Menu.Item>
  </Menu>
);

ReactDOM.render(
  <Dropdown overlay={ProfDrop}>
    <a className="ant-dropdown-link" href="#">
      Professor <Icon type="down" />
    </a>
  </Dropdown>,
  mountNode
);

export default ProfDrop;
