import React from 'react';
import { Table, Menu, Dropdown, Button } from 'antd';
import Head from '../Header-Footer/Head';

class eeCatalog extends React.Component {

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
        const semester1 = [{
            title: 'Semester 1',
            dataIndex: 'course',
            key: 'course'
        }, {
            title: 'Credits',
            dataIndex: 'credit',
            key: 'credit'
        }];

        const semester2 = [{
            title: 'Semester 2',
            dataIndex: 'course',
            key: 'course'
        }, {
            title: 'Credits',
            dataIndex: 'credit',
            key: 'credit'
        }];

        const semester3 = [{
            title: 'Semester 3',
            dataIndex: 'course',
            key: 'course'
        }, {
            title: 'Credits',
            dataIndex: 'credit',
            key: 'credit'
        }];

        const semester4 = [{
            title: 'Semester 4',
            dataIndex: 'course',
            key: 'course'
        }, {
            title: 'Credits',
            dataIndex: 'credit',
            key: 'credit'
        }];

        const summer = [{
            title: 'Semester 8',
            dataIndex: 'course',
            key: 'course'
        }, {
            title: 'Credits',
            dataIndex: 'credit',
            key: 'credit'
        }];

        const semester5 = [{
            title: 'Semester 5',
            dataIndex: 'course',
            key: 'course'
        }, {
            title: 'Credits',
            dataIndex: 'credit',
            key: 'credit'
        }];

        const semester6 = [{
            title: 'Semester 6',
            dataIndex: 'course',
            key: 'course'
        }, {
            title: 'Credits',
            dataIndex: 'credit',
            key: 'credit'
        }];

        const semester7 = [{
            title: 'Semester 7',
            dataIndex: 'course',
            key: 'course'
        }, {
            title: 'Credits',
            dataIndex: 'credit',
            key: 'credit'
        }];

        const semester8 = [{
            title: 'Semester 8',
            dataIndex: 'course',
            key: 'course'
        }, {
            title: 'Credits',
            dataIndex: 'credit',
            key: 'credit'
        }];

        const semester9 = [{
            title: 'Semester 8',
            dataIndex: 'course',
            key: 'course'
        }, {
            title: 'Credits',
            dataIndex: 'credit',
            key: 'credit'
        }];

        const data1 = [{
            key: '1',
            course: 'CHM 2045 General Chemistry 1 or\n' +
            'CHM 2095 Chemistry for Engineers 1 (GE-P) ',
            credit: 3
        }, {
            key: '2',
            course: 'CHM 2045L General Chemistry 1 Laboratory\n' +
            'GE-P',
            credit: 1
        }, {
            key: '3',
            course: 'IUF 1000 What is the Good Life',
            credit: 3
        }, {
            key: '4',
            course: 'Social and Behavioral Sciences',
            credit: 3
        }, {
            key: '5',
            course: 'MAC 2311 Analytic Geometry and Calculus 1',
            credit: 4
        }];

        const data2 = [{
            key: '1',
            course: 'CHM 2046 General Chemistry 2 ',
            credit: 3
        }, {
            key: '2',
            course: 'ENC 3246 Professional Communication for Engineers',
            credit: 3
        }, {
            key: '3',
            course: 'MAC 2312 Analytic Geometry and Calculus 2\n' +
            'GE-M',
            credit: 4
        }, {
            key: '4',
            course: 'PHY 2048 Physics with Calculus 1',
            credit: 3
        }, {
            key: '5',
            course: 'PHY 2048L Physics with Calculus 1 Laboratory',
            credit: 1
        }];

        const data3 = [{
            key: '1',
            course: 'Computer Programming elective',
            credit: 3
        }, {
            key: '2',
            course: 'MAC 2313 Analytic Geometry and Calculus 3\n' +
            'GE-M',
            credit: 4
        }, {
            key: '3',
            course: 'PHY 2049 Physics with Calculus 2',
            credit: 3
        }, {
            key: '4',
            course: 'PHY 2049L Laboratory for Physics with Calculus 2\n' +
            'GE-P',
            credit: 1
        }, {
            key: '5',
            course: 'Humanities',
            credit: 3
        }];

        const data4 = [{
            key: '1',
            course: 'EEL 3111C Circuits 1 ',
            credit: 4
        }, {
            key: '2',
            course: 'EEL 3701C Digital Logic and Computer Systems ',
            credit: 4
        }, {
            key: '3',
            course: 'MAS 3114 Computational Linear Algebra',
            credit: 3
        }, {
            key: '4',
            course: 'Social Behavior Diversity',
            credit: 3
        }];

        const dataSummer = [{
            key: '1',
            course: 'EEL 3135 Introduction to Signals and Systems ',
            credit: 4
        }, {
            key: '2',
            course: 'MAP 2302 Elementary Differential Equations',
            credit: 4
        }, {
            key: '3',
            course: 'STA 3032 Engineering Statistics',
            credit: 3
        }];

        const data5 = [{
            key: '1',
            course: 'EEL 3000 Introduction to Electrical and Computer Engineering ',
            credit: 2
        }, {
            key: '2',
            course: 'EEL 3008 Physics of Electrical Engineering',
            credit: 3
        }, {
            key: '3',
            course: 'EEL 3744C Microprocessor Applications',
            credit: 3
        }, {
            key: '4',
            course: 'Composition',
            credit: 3
        }];

        const data6 = [{
            key: '1',
            course: 'EEL 3112 Circuits 2 ',
            credit: 3
        }, {
            key: '2',
            course: 'Electrical Engineering Breadth electives #1 and #2',
            credit: 8
        }, {
            key: '3',
            course: 'Interdisciplinary elective #1',
            credit: 3
        }];

        const data7 = [{
            key: '1',
            course: 'Electrical Engineering Breadth elective #3',
            credit: 4
        }, {
            key: '2',
            course: 'Electrical Engineering Depth elective #1',
            credit: 3
        }, {
            key: '3',
            course: 'Electrical Engineering Technical elective',
            credit: 5
        }, {
            key: '3',
            course: 'Interdisciplinary elective #2',
            credit: 3
        }];

        const data8 = [{
            key: '1',
            course: 'EEL 3923C Electrical Engineering Design 1',
            credit: 3
        }, {
            key: '2',
            course: 'Electrical Engineering Depth elective #2',
            credit: 3
        }, {
            key: '3',
            course: 'Electrical Engineering Technical elective',
            credit: 3
        }, {
            key: '4',
            course: 'Interdisciplinary elective #3',
            credit: 3
        }];

        const data9 = [{
            key: '1',
            course: 'EEL 4924C Electrical Engineering Design 2 ',
            credit: 3
        }, {
            key: '2',
            course: 'Electrical Engineering Technical elective',
            credit: 9
        }];


        const config = {
            pagination: false,
        }

        return (
            <div>
                <Head />
            <div align="center">
                <h1 className="class-code">Electrical Engineering</h1>
                <h3 className="class-name">Course Catalog</h3>
                <Dropdown overlay = {menu} title="Change Major">
                    <Button >Change Degree Catalog</Button>
                </Dropdown>
                <Dropdown overlay = {PrereqMenu} title="Flowchart of Prerequisites">
                    <Button >Flowchart of Major Coursework</Button>
                </Dropdown>
                <div class="catalog">
                    <Table style={{ width: '1000px' }} {...config} columns={semester1} dataSource={data1} /><br/><br/><br/>
                    <Table style={{ width: '1000px' }} {...config} columns={semester2} dataSource={data2} /><br/><br/><br/>
                    <Table style={{ width: '1000px' }} {...config} columns={semester3} dataSource={data3} /><br/><br/><br/>
                    <Table style={{ width: '1000px' }} {...config} columns={semester4} dataSource={data4} /><br/><br/><br/>
                    <Table style={{ width: '1000px' }} {...config} columns={summer} dataSource={dataSummer} /><br/><br/><br/>
                    <Table style={{ width: '1000px' }} {...config} columns={semester5} dataSource={data5} /><br/><br/><br/>
                    <Table style={{ width: '1000px' }} {...config} columns={semester6} dataSource={data6} /><br/><br/><br/>
                    <Table style={{ width: '1000px' }} {...config} columns={semester7} dataSource={data7} /><br/><br/><br/>
                    <Table style={{ width: '1000px' }} {...config} columns={semester8} dataSource={data8} /><br/><br/><br/>
                    <Table style={{ width: '1000px' }} {...config} columns={semester9} dataSource={data9} />
                </div>
            </div>
            </div>

        )
    }
}

export default eeCatalog;