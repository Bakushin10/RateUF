import React from 'react';
import Flowchart from 'react-simple-flowchart';
import Head from '../Header-Footer/Head';
import Foot from '../Header-Footer/Foot';
import { Menu, Dropdown, Button } from 'antd';


class CEPrereq extends React.Component {

    constructor(props) {
        super(props);
        const code =
            `
COP3502=>condition: COP3502|department1:>http://localhost:8000/#/ClassDetails/CS/COP 3502
COP3503=>condition: COP3503|department2:>http://localhost:8000/#/ClassDetails/CS/COP 3503
COT3100=>operation: COT3100|department3:>http://localhost:8000/#/ClassDetails/CS/COT 3100
EEL3701C=>operation: EEL3701C|department4:>http://localhost:8000/#/ClassDetails/ECE/EEL 3701
EEL3744C=>subroutine: EEL3744C|department5:>http://localhost:8000/#/ClassDetails/ECE/EEL 3744
EEL4712C=>operation: EEL4712C|department6:>http://localhost:8000/#/ClassDetails/ECE/EEL 4712
EEL3923C=>operation: EEL3923C|department7:>http://localhost:8000/#/ClassDetails/ECE/EEL 3923
EEL4924C=>operation: EEL4924C|department8:>http://localhost:8000/#/ClassDetails/ECE/EEL 4924
COP4600=>operation: COP4600|department9:>http://localhost:8000/#/ClassDetails/CS/COP 4600
CDA3101=>subroutine: CDA3101|department10:>http://localhost:8000/#/ClassDetails/CS/CDA 3101
COP3530=>operation: COP3530|department11:>http://localhost:8000/#/ClassDetails/CS/COP 3530
CEN3031=>subroutine: CEN3031|department12:>http://localhost:8000/#/ClassDetails/CS/CEN 3031

COP3502(yes)->COP3503(yes)->EEL3701C->EEL3744C(right)->EEL4712C(bottom)->EEL3923C->EEL4924C
COP3503(no)->CDA3101(right)->COP3530(bottom)
COP3502(no)->COT3100->COP3530(bottom)->CEN3031(right)->COP4600
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
                department5: { fill: 'white' },
                department6: { fill: 'white' },
                department7: { fill: '#ff9e49' },
                department8: { fill: '#ff644f' },
                department9: { fill: '#59fcff' },
                department10: { fill: 'yellow' },
                department11: { fill: 'yellow' },
                department12: { fill: '#59fcff' },
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
                    <a target="_self" rel="noopener noreferrer" href="./#/CSPrereq">CS</a>
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
                    <h1>Computer Engineering Prerequisites</h1>
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

export default CEPrereq;