import React from 'react';
import Flowchart from 'react-simple-flowchart';
import Head from '../Header-Footer/Head';
import Foot from '../Header-Footer/Foot';


class CscPrereq extends React.Component {

    constructor(props) {
        super(props);
        const code =
            `
op1=>operation: Cop3502|department1
op2=>operation: Cop3503|department2
op1(right)->op2(right)`;

        const opt = {
            'arrow-end': 'block',
            scale: 1,
            flowstate: {
                department1: { fill: 'white' },
                department2: { fill: 'white' },
            },
        };

        this.state = {
            code,
            opt,
            elementText: 'none',
        }
    }

    handleCodeChange(e) {
        this.setState({
            code: e.target.value,
        });

    }

    handleOptChange(e) {
        this.setState({
            opt: JSON.parse(e.target.value),
        });

    }

    render() {
        const { code, opt } = this.state;
        return (
            <div>
                <Head/>
                <div align="center">
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

export default CscPrereq;