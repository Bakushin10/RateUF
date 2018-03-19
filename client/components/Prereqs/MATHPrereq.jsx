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
EEl3834=>condition: EEl3834|department1
MAS3114=>operation: MAS3114|department2
EEL3701C=>condition: EEL3701C|department3
EEL3744C=>operation: EEL3744C|department4
EEL4657C=>operation: EEL4657C|department5
EEE4511C=>operation: EEE4511C|department6

EEL3111C=>condition: EEL3111C|department7
EEL3008=>operation: EEL3008|department8
EEL3112=>operation: EEL3112|department9

EEL3135=>condition: EEL3111C|department10
EEL3000=>operation: EEL3000|department11
EEL3472C=>operation: EEL3472C|department12
EEL3211C=>operation: EEL3211C|department13
EEE3396C=>operation: EEE3396C|department14
EEE3308C=>operation: EEE3308C|department15
EEE4260C=>operation: EEE4260C|department16
EEL4514C=>operation: EEL4514C|department17
EEL4712C=>operation: EEL4712C|department18

EEL3834(yes)->MAS3114
EEL3834(no)->EEL3701C(no)->EEL4712C
EEL3111C(no)->EEL3008->EEL3472C->EEL3211C->EEE3396C->EEE3308C->EEE4260C
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

export default MATHPrereq;