import React from 'react';
import axios from 'axios';
import { List, Avatar, Icon, Slider} from 'antd';

import 'antd/dist/antd.css';

class ProfessorDetails extends React.Component {
    
    constructor(){

        super();

        this.state = {
            profName : "",
            id: "",
            prof: []
        }
       // this.inits() = this.inits().bind(this);
     }

    componentDidMount(){
        let self = this;
        const _id = this.props.match.params.id;
        const name = this.props.match.params.name;
        axios.get('/getProfDetails?_id='+_id)
        .then(function(response) {
            console.log("=== getProfDetails === ");
            console.log(response.data);
            console.log(response.data.professor);
            console.log("=== getProfDetails === ");
            self.inits(response.data.professor);  
          });
          
    }

    inits(array){
        console.log("inti")
        array.forEach(element => {
            console.log(element)
            if(element._id === this.props.match.params.id){
                console.log("match")
                this.setState({profName:element.name})
                this.setState({id:element._id})
            }
        });
    }

    render(){
        console.log("prof details");
        console.log(this.state.profName);
        console.log(this.state.id);
        return(
            <div>
                <h1>
                    {this.state.profName}
                    <div>
                    {this.state.id}
                    </div>
                </h1>
            </div>
        )
    }

}

export default ProfessorDetails;