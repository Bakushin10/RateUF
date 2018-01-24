import React from 'react';
import axios from 'axios';


export default class ShowClasses extends React.Component{

    constructor(){
        super();
    }

    render(){
      console.log("ShowClasses rendered");
      console.log(this.props);
        return(
            <table>
            <thead>
              <tr>
                <th></th>
                <th className='desc-col'>Prof</th>
                <th className='button-col'>Course</th>
                <th className='button-col'>Major</th>
                <th className='button-col'>Month</th>
                <th className='button-col'>Year</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.data.map(function(exp){
                  return  (
                    <tr>
                      <td className='counterCell'></td>
                      <td className='button-col'>{exp.profName}</td>
                      <td className='button-col'>{exp.course}</td>
                      <td className='button-col'>{exp.major}</td>
                      <td className='button-col'>{exp.month}</td>
                      <td className='button-col'>{exp.year}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        )
    }
}