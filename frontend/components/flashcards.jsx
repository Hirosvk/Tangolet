const React = require('react');
const Carousel = require('react-bootstrap').Carousel;
const FlashcardsItem = require('./flashcards_item');

const Flashcards = React.createClass({
  getInitialState(){
    return ({index: 0});
  },

  handleSelect(idx, e){
    this.setState({index: idx});
  },


  render(){
    return(
      <div className="flashcards">
      <Carousel activeIndex={this.state.index} onSelect={this.handleSelect}>
        {
          this.props.words.map( word => {
            return (
              <Carousel.Item key={word.word_english}>
                <FlashcardsItem word_english={word.word_english} word_foreign={word.word_foreign}
                  language_name={this.props.language_name}/>
              </Carousel.Item>
            );
          })
        }
      </Carousel>
      <h2>{`${this.state.index + 1} of ${this.props.words.length}`}</h2>
    </div>
    );
  }

});

module.exports = Flashcards;
