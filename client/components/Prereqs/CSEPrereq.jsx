import React from 'react';
import Flowchart from 'react-simple-flowchart';
import Head from '../Header-Footer/Head';
import Foot from '../Header-Footer/Foot';
import { Menu, Dropdown, Button } from 'antd';


class CSEPrereq extends React.Component {

    constructor(props) {
        super(props);
        const code =
            `
COP3502=>condition: COP3502|department1:>http://localhost:8000/#/ClassDetails/CS/COP 3502
COP3503=>condition: COP3503|department2:>http://localhost:8000/#/ClassDetails/CS/COP 3503
COT3100=>condition: COT3100|department3:>http://localhost:8000/#/ClassDetails/CS/COT 3100
EEL3701C=>condition: EEL3701C|department4:>http://localhost:8000/#/ClassDetails/ECE/EEL 3701
COT4501=>condition: COT4501|department5:>http://localhost:8000/#/ClassDetails/CS/COT 4501
CDA3101=>condition: CDA3101|department6:>http://localhost:8000/#/ClassDetails/CS/CDA 3101
COP3530=>condition: COP3530|department7:>http://localhost:8000/#/ClassDetails/CS/COP 3530
CIS4301=>condition: CIS4301|department8:>http://localhost:8000/#/ClassDetails/CS/CIS 4301
CEN3031=>condition: CEN3031|department9:>http://localhost:8000/#/ClassDetails/CS/CEN 3031
COP4600=>condition: COP4600|department10:>http://localhost:8000/#/ClassDetails/CS/COP 4600
CNT4007C=>condition: CNT4007C|department11:>http://localhost:8000/#/ClassDetails/CS/CNT 4007

COP3502(yes)->COP3503(yes)->EEL3701C(no)->CDA3101(yes)->COP4600
COP3502(no)->COT3100(yes)->CIS4301(no)->COP3530(yes)->CEN3031
COP3530(no)->COP4600(yes)->CNT4007C
CDA3101(no)->COT4501
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
                department10: { fill: '#59fcff' },
                department11: { fill: 'blue' }

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
                    <a target="_self" rel="noopener noreferrer" href="./#/ComputerScienceEngineeringCatalog">CSE</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_self" rel="noopener noreferrer" href="./#/ComputerScienceLiberalArtsCatalog">CSC</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_self" rel="noopener noreferrer" href="./#/ComputerEngineeringCatalog">CE</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_self" rel="noopener noreferrer" href="./#/ElectricalEngineeringCatalog">EE</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_self" rel="noopener noreferrer" href="./#/MathCatalog">MATH</a>
                </Menu.Item>
            </Menu>
        );

        const PrereqMenu= (
            <Menu>
                <Menu.Item>
                    <a target="_self" rel="noopener noreferrer" href="./#/CSEPrereq">CSE</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_self" rel="noopener noreferrer" href="./#/CSCPrereq">CSC</a>
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
                    <h1>Computer Science, Engineering</h1>
                    <h3>Prerequisites</h3>
                    <div align="left">
                        <a>**same color means you can take the classes at the same time**</a>

                        <br/>
                        <a>**a change in color means it has a prerequisite**</a>
                    </div>
                    <div>
                        <Dropdown overlay = {menu} title="Change Major">
                            <Button >Change Degree Catalog</Button>
                        </Dropdown>
                        <Dropdown overlay = {PrereqMenu} title="Flowchart of Prerequisites">
                            <Button >Flowchart of Prerequisites</Button>
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

export default CSEPrereq;