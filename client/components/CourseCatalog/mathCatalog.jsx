import React from 'react';
import { Table, Menu, Dropdown, Button } from 'antd';
import Head from '../Header-Footer/Head';

class mathCatalog extends React.Component {

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
            course: 'Biological or Physical Science',
            credit: 3
        }, {
            key: '2',
            course: 'Social and Behavioral Sciences',
            credit: 3
        }, {
            key: '3',
            course: 'MAC 2311 Analytic Geometry and Calculus 1',
            credit: 4
        }, {
            key: '4',
            course: 'IUF 1000 What is the Good Life\n' +
            'GE-H',
            credit: 3
        }];

        const data2 = [{
            key: '1',
            course: 'Biological or Physical Science',
            credit: 4
        }, {
            key: '2',
            course: 'Composition',
            credit: 1
        }, {
            key: '3',
            course: 'MAC 2312 Analytic Geometry and Calculus 2',
            credit: 4
        }, {
            key: '4',
            course: 'Elective',
            credit: 3
        }, {
            key: '5',
            course: 'Humanities',
            credit: 3
        }];

        const data3 = [{
            key: '1',
            course: 'MHF 3202 Sets and Logic ',
            credit: 3
        }, {
            key: '2',
            course: 'MAC 2313 Analytic Geometry and Calculus 3' +
            'GE-M',
            credit: 4
        }, {
            key: '3',
            course: 'Humanities',
            credit: 3
        }, {
            key: '4',
            course: 'Physical Science',
            credit: 3
        }, {
            key: '5',
            course: 'Science laboratory',
            credit: 1
        }, {
            key: '5',
            course: 'Social and Behavioral Sciences',
            credit: 1
        }];

        const data4 = [{
            key: '1',
            course: 'MAP 2302 Elementary Differential Equations ',
            credit: 3
        }, {
            key: '2',
            course: 'MAS 4105 Linear Algebra 1',
            credit: 4
        }, {
            key: '3',
            course: 'Composition',
            credit: 3
        }, {
            key: '4',
            course: 'Biological Science',
            credit: 3
        }, {
            key: '5',
            course: 'Social and Behavioral Sciences',
            credit: 3
        }];

        const data5 = [{
            key: '1',
            course: 'MAS 4301 Abstract Algebra 1',
            credit: 3
        }, {
            key: '2',
            course: 'Elective\n' +
            '3000 level or higher, not in major',
            credit: 3
        }, {
            key: '3',
            course: 'Foreign language',
            credit: 4
        }, {
            key: '4',
            course: 'Mathematics elective',
            credit: 3
        }];

        const data6 = [{
            key: '1',
            course: 'Elective',
            credit: 3
        }, {
            key: '2',
            course: 'Electives\n' +
            'Two, at 3000 level or higher, not in major',
            credit: 6
        }, {
            key: '3',
            course: 'Foreign language',
            credit: 4
        }, {
            key: '4',
            course: 'Mathematics elective',
            credit: 3
        }];

        const data7 = [{
            key: '1',
            course: 'MAA 4102 Introduction to Advanced Calculus \n'+
            'for Engineers and Physical Scientists 1',
            credit: 4
        }, {
            key: '2',
            course: 'Elective\n' +
            'Or foreign language if 4-3-3 option',
            credit: 3
        }, {
            key: '3',
            course: 'Electives\n' +
            'Two, at 3000 level or higher, not in major',
            credit: 6
        }, {
            key: '4',
            course: 'Mathematics elective',
            credit: 3
        }];

        const data8 = [{
            key: '1',
            course: 'MAA 4102 Introduction to Advanced Calculus\n' +
            'for Engineers and Physical Scientists 2',
            credit: 3
        }, {
            key: '2',
            course: 'Elective',
            credit: 3
        }, {
            key: '3',
            course: 'Electives\n' +
            'Two, at 3000 level or higher, not in major',
            credit: 6
        }, {
            key: '4',
            course: 'Mathematics elective',
            credit: 3
        }];


        return (
            <div>
                <Head/>
            <div align="center">
                <h1>Math Major</h1>
                <h3>Course Catalog</h3>
                <Dropdown overlay = {menu} title="Change Major">
                    <Button >Change Degree Catalog</Button>
                </Dropdown>
                <Table columns={semester1} dataSource={data1} />
                <Table columns={semester2} dataSource={data2} />
                <Table columns={semester3} dataSource={data3} />
                <Table columns={semester4} dataSource={data4} />
                <Table columns={semester5} dataSource={data5} />
                <Table columns={semester6} dataSource={data6} />
                <Table columns={semester7} dataSource={data7} />
                <Table columns={semester8} dataSource={data8} />
            </div>
            </div>
        )
    }
}

export default mathCatalog;