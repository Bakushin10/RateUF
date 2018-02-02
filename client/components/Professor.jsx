import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { List, Avatar, Icon, Slider} from 'antd';

import 'antd/dist/antd.css';

class Professor extends React.Component {
    
    constructor(){

        super();

        this.state = {
            selectedMajor: "CS",
            professor: [] //array professors 
        }

        this.getProfByMajor = this.getProfByMajor.bind(this);
    }

    componentDidMount(){
        this.getProfByMajor(this, 'CS');
    }

    getProfByMajor(ev, major){
        axios.get('/getProfByMajor?major='+major) //passing major as an argument
          .then(function(response) {
            console.log("=== getProfByMajor === ");
            console.log(response.data);
            console.log(response.data[0].professor);
            console.log("=== getProfByMajor === ");
            ev.setState({professor:response.data[0].professor})
          });
    }

    

    

    render(){
        /*
        const listData = [];
        for (let i = 0; i < 5; i++) {
          listData.push({
            href: 'http://ant.design',
            title: `ant design part ${i}`,
            description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
          });
        }
        */
        const pagination = {
            pageSize: 10,
            current: 1,
            total: this.state.professor.length,
            onChange: (() => {}),
        };

        const IconText = ({ type, text }) => (
            <span>
              <Icon type={type} style={{ marginRight: 8 }} />
              {text}
            </span>
        );

        return(
            <div class = "container">
                <h1>Hi lol</h1>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={pagination}
                    dataSource={ this.state.professor }
                    renderItem={item => (
                        <List.Item
                            key={item.id}
                            actions={[<IconText type="star-o" text="156" />, 
                                    <IconText type="like-o" text="156" />, 
                                    <IconText type="message" text="2" />]}
                        >
                            <List.Item.Meta
                                title={<Link to = "/Home">{item.name}</Link>}
                                description={"description"}
                            />
                            {item.content}
                            <Slider defaultValue={30} 
                                    disabled = "true" 
                                    marks={{ 0: 'A', 20: 'B', 40: 'C', 60: 'D', 80: 'E', 100: 'F' }} 
                            />
                        </List.Item>
                    )}
                />
            </div>
        )
    }

}

export default Professor;

