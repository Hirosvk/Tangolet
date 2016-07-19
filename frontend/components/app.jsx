'use strict';
const React = require('react');
import Joyride from 'react-joyride';
const Header = require('./header');
const SideNavbar = require('./side_navbar');


const App = React.createClass({
  getInitialState(){
    return ({
      steps: [],
      tourOn: false
    });
  },

  // addSteps(stepsToAdd){
  //   if (Array.isArray(stepsToAdd)){
  //     let newSteps = this.state.steps.concat(stepsToAdd);
  //     this.setState({steps: newSteps});
  //   }
  // },
  // above implementation would not concatenate the current state with the stepsToAdd,
  // I have not had a chance to figure out why. The blew was taken straight from
  // Joyride github.

  addSteps(steps) {
    const joyride = this.refs.joyride;
    let newSteps = steps;

    if (!Array.isArray(newSteps)) {
      newSteps = [newSteps];
    }

    if (!newSteps.length) {
      return;
    }

    this.setState(currentState => {
      currentState.steps = currentState.steps.concat(joyride.parseSteps(newSteps));
      return currentState;
    });
  },

  resetTour(){
    this.setState({steps: []});
    this.refs.joyride.reset(true);
  },

  componentDidUpdate(){
    if (this.state.steps.length > 0 && this.state.tourOn === false){
      this.refs.joyride.start();
      this.setState({tourOn: true});
    }
  },

  render(){
    const newChildren = React.cloneElement(this.props.children, {
      addSteps: this.addSteps,
      resetTour: this.resetTour
    });
    return (
      <div className='app group'>
        <Joyride
          ref="joyride"
          debug={false}
          steps={this.state.steps}
          type='single'
          locale={{
            close: (<span>Close</span>),
          }}
          showSkipButton={false}
          showStepsProgress={false}
          showOverlay={false}
          scrollToSteps={false}
          tooltipOffset={0}
        />

        <Header addSteps={this.addSteps}/>
        <main className="main">
          <SideNavbar addSteps={this.addSteps} resetTour={this.resetTour}/>
          {newChildren}
        </main>
      </div>
    );
  }
});

module.exports = App;
