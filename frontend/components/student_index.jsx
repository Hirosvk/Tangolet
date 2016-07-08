const React = require('react');
const ListGroupItem = require('react-bootstrap').ListGroupItem;
const ListGroup = require('react-bootstrap').ListGroup;

const StudentIndex = React.createClass({
  componentWillReceiveProps(newProps){
    this.students = newProps.students;
    this.forceUpdate();
  },

  render(){
    const students = this.students || this.props.students;
    return(
      <ListGroup>
      {
      students.map( student =>{
        return <ListGroupItem key={student.id} header={student.username}/>;
        })
      }
      </ListGroup>
    );
  }
});

module.exports = StudentIndex;
