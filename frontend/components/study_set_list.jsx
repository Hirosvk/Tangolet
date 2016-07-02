const React = require('react');

const StudySetList = React.createClass({

  render(){
    return (
      <table className="study_set_list">
        <thead>
          <tr>
            <th>English</th>
            <th>{this.props.language_name}</th>
          </tr>
        </thead>
        <tbody>
        {
          this.props.words.map( function(word){
            return (
              <tr key={word.word_english}>
                <td>{word.word_english}</td>
                <td>{word.word_foreign}</td>
              </tr>
            );
          })
        }
        </tbody>
      </table>
    );
  }
});

module.exports = StudySetList;
