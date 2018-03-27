import React from 'react';
import Flowchart from 'react-simple-flowchart';
import Head from '../Header-Footer/Head';
import Foot from '../Header-Footer/Foot';
import { Menu, Dropdown, Button } from 'antd';


class EEPrereq extends React.Component {

    constructor(props) {
        super(props);
        const code =
            `
EEL3701C=>condition: EEL3701C|department1:>http://localhost:8000/#/ClassDetails/CS/COP 3502
EEL3000=>condition: EEL3000|department2:>http://localhost:8000/#/ClassDetails/CS/COP 3503
EEL3135=>condition: EEL3135|department3:>http://localhost:8000/#/ClassDetails/CS/COT 3100
EEL3111C=>condition: EEL3111C|department4:>http://localhost:8000/#/ClassDetails/ECE/EEL 3701
EEL3008=>condition: EEL3008|department5:>http://localhost:8000/#/ClassDetails/ECE/EEL 3744
EEL3112=>condition: EEL3112|department6:>http://localhost:8000/#/ClassDetails/ECE/EEL 4712
EEL3744C=>condition: EEL3744C|department7:>http://localhost:8000/#/ClassDetails/ECE/EEL 3923


EEL3701C(no)->EEL3000(no)->EEL3135(no)->EEL3111C
EEL3701C(yes)->EEL3744C





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
                    <h1>Electrical Engineering</h1>
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

export default EEPrereq;