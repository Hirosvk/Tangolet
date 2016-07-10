const ReactDOM = require('react-dom');
const React = require('react');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;
const Redirect = ReactRouter.Redirect;

const SessionActions = require('./actions/session_actions');
const Header = require('./components/header');
const StudySet = require('./components/study_set');
const Index = require('./components/index.jsx');
const StudySetForm = require('./components/study_set_form');
const KlassForm = require('./components/klass_form');
const Klass = require('./components/klass');
const TestScoreIndex = require('./components/test_score_index');
const SideNavbar = require('./components/side_navbar');
const About = require('./components/about');

const App = React.createClass({
  render(){
    return (
      <div className='app group'>
        <Header/>

        <main className="main">
          <SideNavbar />
          {this.props.children}
        </main>
      </div>
    );
  }
});


const appRouter = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index}/>
      <Route path="class/:klassId" component={Klass} />
      <Route path="study_set/:id" component={StudySet} />
      <Route path="study_set_form(/:action)" component={StudySetForm} />
      <Route path="class_form(/:action)" component={KlassForm} />
      <Route path="my_test_scores" component={TestScoreIndex} />
      <Route path="about" component={About} />
    </Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", function(){
  if (window.currentUser){
    SessionActions.receiveUser(window.currentUser);
  }
  ReactDOM.render(appRouter, document.getElementById('root'));
});
