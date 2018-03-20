import React from 'react';
import Flowchart from 'react-simple-flowchart';
import Head from '../Header-Footer/Head';
import Foot from '../Header-Footer/Foot';
import { Menu, Dropdown, Button } from 'antd';


class CSCPrereq extends React.Component {

    constructor(props) {
        super(props);
        const code =
            `
COP3502=>condition: COP3502|department1
COP3503=>condition: COP3503|department2
COT3100=>operation: COT3100|department3
EEL3701C=>operation: EEL3701C COT4501 CDA3101|department4
COT4501=>operation: COT4501|department5
CDA3101=>operation: CDA3101|department6
COP3530=>condition: COP3530|department7
CIS4301=>operation: CIS4301|department8
CEN3031=>operation: CEN3031|department9
COP4600=>operation: COP4600|department10

COP3502(yes)->COP3503(yes)->EEL3701C->COP4600
COP3502(no)->COT3100(right)->COP3530(yes)->CIS4301(right)
COP3503(no)->COP3530
COP3530(no)->COP4600(right)->CEN3031
`;

        const opt = {
            'yes-text' : ' ',
            'no-text' : ' ',
            'arrow-end': 'block',
            scale: 1,
            flowstate: {
                department1: { fill: '#57ff35' },
                department2: { fill: 'pink' },
                department3: { fill: 'pink' },
                department4: { fill: 'yellow' },
                department5: { fill: 'yellow' },
                department6: { fill: 'yellow' },
                department7: { fill: '#ff9e49' },
                department8: { fill: '#ff9e49' },
                department9: { fill: '#59fcff' },
                department10: { fill: '#59fcff' }

            },
        };

        this.state = {
            code,
            opt,
            elementText: 'none',
        }
    }

    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_self" rel="noopener noreferrer" href="./#/CSCPrereq">CS</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_self" rel="noopener noreferrer" href="./#/CEPrereq">CE</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_self" rel="noopener noreferrer" href="./#/EEPrereq">EE</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_self" rel="noopener noreferrer" href="./#/MATHPrereq">MATH</a>
                </Menu.Item>
            </Menu>
        );
        const { code, opt } = this.state;
        return (
            <div>
                <Head/>
                <div align="center">
                    <h1>Computer Science, Liberal Arts Prerequisites</h1>
                    <a>**same color means you can take the classes at the same time**</a>
                    <div>
                    <Dropdown overlay = {menu} title="Change Major">
                        <Button >Change Degree Prereqs</Button>
                    </Dropdown>
                    </div>
                    <Flowchart
                        chartCode={code}
                        options={opt}
                    />
                </div>
                <Foot/>
            </div>
        );
    }
}

export default CSCPrereq;