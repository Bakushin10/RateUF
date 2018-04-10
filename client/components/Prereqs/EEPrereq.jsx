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
EEL3701C=>condition: EEL3701C|department1:>http://localhost:8000/#/ClassDetails/ECE/EEL%203701
EEL3000=>condition: EEL3000|department2:>http://localhost:8000/#/ClassDetails/ECE/EEL%203000
EEL3135=>condition: EEL3135|department3:>http://localhost:8000/#/ClassDetails/ECE/EEL%203135
EEL3111C=>condition: EEL3111C|department4:>http://localhost:8000/#/ClassDetails/ECE/EEL%203701
EEL3008=>condition: EEL3008|department5:>http://localhost:8000/#/ClassDetails/ECE/EEL%203744
EEL3112=>condition: EEL3112|department6:>http://localhost:8000/#/ClassDetails/ECE/EEL%204712
EEL3744C=>condition: EEL3744C|department7:>http://localhost:8000/#/ClassDetails/ECE/EEL%203923

EEL3701C(no)->EEL3000(no)->EEL3135(no)->EEL3111C(yes)->EEL3008
EEL3701C(yes)->EEL3744C
EEL3135(yes)->EEL3112
EEL3000(yes)->EEL3112
EEL3111C(no)->EEL3112
`;

        const opt = {
            'yes-text' : ' ',
            'no-text' : ' ',
            'arrow-end': 'block',
            scale: 1,
            flowstate: {
                department1: { fill: '#57ff35' },
                department2: { fill: '#57ff35' },
                department3: { fill: '#57ff35' },
                department4: { fill: '#57ff35' },
                department5: { fill: '#1c95ff' },
                department6: { fill: '#1c95ff' },
                department7: { fill: '#1c95ff' }
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
                    <a target="_self" rel="noopener noreferrer" href="./#/CSECatalog">CSE</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_self" rel="noopener noreferrer" href="./#/CSLACatalog">CSC</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_self" rel="noopener noreferrer" href="./#/CECatalog">CE</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_self" rel="noopener noreferrer" href="./#/EECatalog">EE</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_self" rel="noopener noreferrer" href="./#/MATHCatalog">MATH</a>
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
                    <h1 className="class-code">Electrical Engineering</h1>
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