const React = require('react');

const StudySetList = React.createClass({

  render(){
    console.log(this.props.words);
    return (
      <div className="study_set">
        <table>
          <tbody>
          <tr>
            <td>English</td>
            <td>Foreign Language</td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
});

module.exports = StudySetList;
