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
COP3502=>condition: COP3502|department1:>#/ClassDetails/CS/COP%203502
COP3503=>condition: COP3503|department2:>#/ClassDetails/CS/COP%203503
COT3100=>condition: COT3100|department3:>#/ClassDetails/CS/COT%203100
EEL3701C=>condition: EEL3701C|department4:>#/ClassDetails/ECE/EEL%203701
COT4501=>condition: COT4501|department5:>#/ClassDetails/CS/COT%204501
CDA3101=>condition: CDA3101|department6:>#/ClassDetails/CS/CDA%203101
COP3530=>condition: COP3530|department7:>#/ClassDetails/CS/COP%203530
CIS4301=>condition: CIS4301|department8:>#/ClassDetails/CS/CIS%204301
CEN3031=>condition: CEN3031|department9:>#/ClassDetails/CS/CEN%203031
COP4600=>condition: COP4600|department10:>#/ClassDetails/CS/COP%204600

COP3502(yes)->COP3503(yes)->EEL3701C(no)->CDA3101(yes)->COP4600
COP3502(no)->COT3100(yes)->CIS4301(no)->COP3530(yes)->CEN3031
COP3503(no)->CIS4301
COP3530(no)->COP4600
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
                    <h1 className="class-code">Computer Science, Liberal Arts</h1>
                    <h3 className="class-name">Major Coursework</h3>
                    <div>
                        <Dropdown overlay = {menu} title="Change Major">
                            <Button >Change Degree Catalog</Button>
                        </Dropdown>
                        <Dropdown overlay = {PrereqMenu} title="Flowchart of Prerequisites">
                            <Button >Flowchart of Major Coursework</Button>
                        </Dropdown>
                    </div>
                    <div class="legend">
                        <ul>
                            <li>Click on the class to see the review for it</li>
                            <li>The same color means it has the same prerequisites</li>
                            <li>If you see a change in color, the arrow pointing to the new color is the prerequisite</li>
                        </ul>
                    </div>
                    <div align="right">
                        <Flowchart
                            chartCode={code}
                            options={opt}
                        />
                    </div>
                </div>
                <Foot/>
            </div>
        );
    }
}

export default CSCPrereq;