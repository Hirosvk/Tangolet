const React = require('react');

const StudySetList = React.createClass({

  render(){
    return (
      <div className="study_set_list">
        <table>
          <thead>
            <tr>
              <th>English</th>
              <th>Foreign Language</th>
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
      </div>
    );
  }
});

module.exports = StudySetList;
