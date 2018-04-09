import React from 'react';
import Flowchart from 'react-simple-flowchart';
import Head from '../Header-Footer/Head';
import Foot from '../Header-Footer/Foot';
import { Menu, Dropdown, Button } from 'antd';


class MATHPrereq extends React.Component {
    constructor(props) {
        super(props);
        const code =
            `
MAC2311=>condition: MAC2311|department1:>http://localhost:8000/#/ClassDetails/MATH/MAC%202311
MAC2312=>condition: MAC2312|department2:>http://localhost:8000/#/ClassDetails/MATH/MAC%202312
MAC2313=>condition: MAC2313|department3:>http://localhost:8000/#/ClassDetails/MATH/MAC%202313
MHF3202=>condition: MHF3202|department4:>http://localhost:8000/#/ClassDetails/MATH/MHF%203202
MAP2302=>condition: MAP2302|department5:>http://localhost:8000/#/ClassDetails/MATH/MAP%202302
MAS4105=>condition: MAS4105|department6:>http://localhost:8000/#/ClassDetails/MATH/MAS%204105
MAS4301=>condition: MAS4301|department7:>http://localhost:8000/#/ClassDetails/MATH/MAS%204301
MAA4211=>condition: MAA4211|department8:>http://localhost:8000/#/ClassDetails/MATH/MAA%204211
MAA4212=>condition: MAA4212|department9:>http://localhost:8000/#/ClassDetails/MATH/MAA%204212

MAC2311(yes)->MAC2312(yes)->MAC2313(yes)->MAS4105(yes)->MAS4301(yes)->MAA4211(yes)->MAA4212
MAC2312(no)->MHF3202(yes)->MAS4105
MAC2313(no)->MAP2302

`;
        const opt = {
            'yes-text' : ' ',
            'no-text' : ' ',
            'arrow-end': 'block',
            scale: 1,
            flowstate: {
                department1: { fill: '#57ff35' },
                department2: { fill: 'pink' },
                department3: { fill: 'yellow' },
                department4: { fill: 'pink' },
                department5: { fill: 'yellow' },
                department6: { fill: 'white' },
                department7: { fill: '#ff9e49' },
                department8: { fill: '#ff644f' },
                department9: { fill: '#59fcff' }
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
                    <h1>Math, Liberal Arts</h1>
                    <h3>Major Coursework</h3>
                    <div>
                        <Dropdown overlay = {menu} title="Change Major">
                            <Button >Change Degree Catalog</Button>
                        </Dropdown>
                        <Dropdown overlay = {PrereqMenu} title="Flowchart of Prerequisites">
                            <Button >Flowchart of Major Coursework</Button>
                        </Dropdown>
                    </div>
                    <div class="legend">
                        <br/>
                        <ul class="legend-text">
                            <li >Click on the class to see the review for it</li>
                            <li>The same color means it has the same prerequisite</li>
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

export default MATHPrereq;