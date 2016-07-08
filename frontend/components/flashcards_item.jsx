const React = require('react');

const FlashcardsItem = React.createClass({
  getInitialState(){
    return({flipped: ""});
  },

  flip(){
    if (this.state.flipped === "flipped"){
      this.setState({flipped: ""});
    } else {
      this.setState({flipped: "flipped"});
    }
  },

  render (){
    return (
      <div className="card">
        <div className={`card front ${this.state.flipped}`}
          onClick={this.flip}>
          <h3>English</h3>
          <span>{this.props.word_english}</span>
        </div>
        <div className={`card back ${this.state.flipped}`}
          onClick={this.flip}>
          <h3>{this.props.language_name}</h3>
          <span>{this.props.word_foreign}</span>
        </div>
      </div>
    );
  }
});

module.exports = FlashcardsItem;
