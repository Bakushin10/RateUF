import React from 'react';
import { Icon, Form, Input} from 'antd';
import { ProfessorList } from '../Professor/ProfessorList';
import { CourseList } from '../Course/CourseList';

class Search extends React.Component{

    constructor(){
        super();
        this.state = {
            searchTerm : '',
            listToShow : [],
        }
        this.handleSearchProf = this.handleSearchProf.bind(this);
        this.handleSearchCourse = this.handleSearchCourse.bind(this);
    }
    
    componentDidMount(){
        this.setState({ professorToShow : this.props.professor})
    }

    handleSearchProf(e){
        this.setState({ searchTerm: e.target.value });
        console.log("searchTerm")
        console.log(this.state.searchTerm)
        this.searchProf();
    }
    
    handleSearchCourse(e) {
        this.setState({ searchTerm: e.target.value });
        this.searchCourse();
    }

    searchProf(){
        const selectedProf = this.props.professor.filter(prof => {
          if (`${prof.name}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0) {
            return prof;
          }
        });
        //this.setState({ professorToShow : selectedProf })
        this.setState({ listToShow : selectedProf })
    }

    searchCourse() {
        const selectedCourse = this.props.course.filter(course => {
          if (`${course.courseName}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0 ||
              `${course.courseCode}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0) {
            return course;
          }
        });
        this.setState({ listToShow: selectedCourse });
      }
    
    handleInfiniteOnLoad() {
        let data = this.state.listToShow;
        this.setState({
          loading: true
        });
        if (data.length > 14) {
          message.warning('Infinite List loaded all');
          this.setState({
            hasMore: false,
            loading: false
          });
          return;
        }
        this.getData(res => {
          data = data.concat(res.results);
          this.setState({
            data,
            loading: false
          });
        });
      }

    render(){
        let listToShow;
        
        if(this.props.type === "Professor"){
            if(this.state.searchTerm == ''){
                listToShow = this.props.professor
            }else{
                listToShow = this.state.listToShow;
            }
            return(
                <div>
                    <Form>
                        <Input 
                        type="text"
                        value={ this.state.searchTerm}
                        placeholder="Search your Professor"
                        onChange={this.handleSearchProf}
                        />
                    </Form>
                    <div className="list-to-show">
                    { ProfessorList(listToShow, this.props.loading, this.props.hasMore, this.props.reviewForAllProfs,
                            this.handleInfiniteOnLoad, this.props.dataloaded) }
                    </div>
               </div>
            )
        }
        if(this.props.type === "Course"){
            if(this.state.searchTerm == ''){
                listToShow = this.props.course
            }else{
                listToShow = this.state.listToShow;
            }
            return(
                <div>
                    <Form>
                        <Input 
                        type="text"
                        value={ this.state.searchTerm}
                        placeholder="Search your Course"
                        onChange={this.handleSearchCourse}
                        />
                    </Form>
                    <div className="list-to-show">
                    { CourseList(listToShow, this.props.loading, this.props.hasMore, this.props.reviewForAllCourses,
                            this.handleInfiniteOnLoad, this.props.dataloaded) }
                    </div>
               </div>
            )
        }
    }
}

export default Search;