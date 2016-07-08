const ReactDOM = require('react-dom');
const React = require('react');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;
const Redirect = ReactRouter.Redirect;

const StudySetActions = require('./actions/study_set_actions');
const StudySetStore = require('./stores/study_set_store');
const SessionActions = require('./actions/session_actions');
const LanguageStore = require('./stores/language_store');
const LanguageActions = require('./actions/language_actions');
const IndexActions = require('./actions/index_actions');
const KlassIndexStores = require('./stores/klass_index_store');
const StudySetIndexStores = require('./stores/study_set_index_store');

const CurrentUserStore = require('./stores/current_user_store');
const KlassStore = require('./stores/klass_store');
const KlassActions = require('./actions/klass_actions');
const TestActions = require('./actions/test_actions');
const TestStore = require('./stores/test_store');

const LoginForm = require('./components/login_form');
const SignupForm = require('./components/signup_form');
const Header = require('./components/header');
const Main = require('./components/main');
const StudySet = require('./components/study_set');
const StudySetList = require('./components/study_set_list');
const Index = require('./components/index.jsx');
const StudySetForm = require('./components/study_set_form');
const KlassForm = require('./components/klass_form');
const Klass = require('./components/klass');
const StudySetIndex = require('./components/study_set_index');
const KlassIndex = require('./components/klass_index');
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


// Content doesn't render unless any of its children Routes match.
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

window.$ = $;
