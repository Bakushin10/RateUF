import React from 'react';
import { Table, Menu, Dropdown, Button } from 'antd';
import Head from '../Header-Footer/Head';

class ceCatalog extends React.Component {

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
            course: 'COP 3502 Programming Fundamentals 1',
            credit: 3
        }, {
            key: '4',
            course: 'Social and Behavioral Sciences',
            credit: 3
        }, {
            key: '5',
            course: 'IUF 1000 What is the Good Life\n' +
            'GE-H',
            credit: 3
        }, {
            key: '6',
            course: 'MAC 2311 Analytic Geometry and Calculus 1',
            credit: 4
        }];

        const data2 = [{
            key: '1',
            course: 'COP 3503 Programming Fundamentals 2 ',
            credit: 3
        }, {
            key: '2',
            course: 'CHM 2046 General Chemistry 2',
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
        }, {
            key: '6',
            course: 'ENC 1101 Expository and Argumentative Writing',
            credit: 4
        }];

        const data3 = [{
            key: '1',
            course: 'COP 3530 Data Structures and Algorithm ',
            credit: 4
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
            course: 'COT 3100 Applications of Discrete Structures',
            credit: 3
        }];

        const data4 = [{
            key: '1',
            course: 'CDA 3101 Introduction to Computer Organization ',
            credit: 3
        }, {
            key: '2',
            course: 'COP 3530 Data Structures and Algorithms',
            credit: 4
        }, {
            key: '3',
            course: 'EEL 3111C Circuits 1',
            credit: 4
        }, {
            key: '4',
            course: 'MAP 2302 Elementary Differential Equations',
            credit: 3
        }, {
            key: '5',
            course: 'Social and Behavioral Sciences',
            credit: 3
        }];

        const data5 = [{
            key: '1',
            course: 'Humanities ',
            credit: 3
        }, {
            key: '2',
            course: 'EEL 3744C Microprocessor Applications',
            credit: 4
        }, {
            key: '3',
            course: 'MAS 3114 Computational Linear Algebra',
            credit: 3
        }, {
            key: '4',
            course: 'CEN 3031 Introduction to Software Engineering',
            credit: 3
        }, {
            key: '5',
            course: 'College breadth elective',
            credit: 3
        }];

        const data6 = [{
            key: '1',
            course: 'Engineering ethics course',
            credit: 2
        }, {
            key: '2',
            course: 'EEL 4712C Digital Design',
            credit: 4
        }, {
            key: '3',
            course: 'College breadth elective',
            credit: 3
        }, {
            key: '4',
            course: 'Technical electives',
            credit: 6
        }];

        const data7 = [{
            key: '1',
            course: 'CEN 3913 CISE Design 1' ,
            credit: 3
        }, {
            key: '2',
            course: 'Technical electives',
            credit: 3
        }, {
            key: '3',
            course: 'COP 4600 Operating Systems',
            credit: 4
        }, {
            key: '4',
            course: 'EEL 3135 Signals and Systems',
            credit: 3
        }, {
            key: '5',
            course: 'STA 3032 Engineering Statistics',
            credit: 3
        }];

        const data8 = [{
            key: '1',
            course: 'CEN 4914 CISE Design 2',
            credit: 3
        }, {
            key: '2',
            course: 'Technical electives',
            credit: 9
        }];


        return (
            <div>
                <Head />
                <div align="center">
                    <h1>Computer Engineering</h1>
                    <h3>Course Catalog</h3>
                    <Dropdown overlay = {menu} title="Change Major">
                        <Button >Change Degree Catalog</Button>
                    </Dropdown>
                    <Dropdown overlay = {PrereqMenu} title="Flowchart of Prerequisites">
                        <Button >Flowchart of Prerequisites</Button>
                    </Dropdown>
                    <Table style={{ width: '1000px' }} columns={semester1} dataSource={data1} />
                    <Table style={{ width: '1000px' }} columns={semester2} dataSource={data2} />
                    <Table style={{ width: '1000px' }} columns={semester3} dataSource={data3} />
                    <Table style={{ width: '1000px' }} columns={semester4} dataSource={data4} />
                    <Table style={{ width: '1000px' }} columns={semester5} dataSource={data5} />
                    <Table style={{ width: '1000px' }} columns={semester6} dataSource={data6} />
                    <Table style={{ width: '1000px' }} columns={semester7} dataSource={data7} />
                    <Table style={{ width: '1000px' }} columns={semester8} dataSource={data8} />
                </div>
            </div>
        )
    }
}

export default ceCatalog;