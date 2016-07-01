const ReactDOM = require('react-dom');
const React = require('react');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;

const StudySetActions = require('./actions/study_set_actions');
const StudySetStore = require('./stores/study_set_store');
const SessionActions = require('./actions/session_actions');
const LanguageStore = require('./stores/language_store');
const LanguageActions = require('./actions/language_actions');
const IndexActions = require('./actions/index_actions');
const IndexStores = require('./stores/index_store');
const CurrentUserStore = require('./stores/current_user_store');
const KlassStore = require('./stores/klass_store');
const KlassActions = require('./actions/klass_actions');

const LoginForm = require('./components/login_form');
const SignupForm = require('./components/signup_form');
const Header = require('./components/header');
const Main = require('./components/main');
const Content = require('./components/content');
const StudySet = require('./components/study_set');
const StudySetList = require('./components/study_set_list');
const Index = require('./components/index.jsx');
const StudySetForm = require('./components/study_set_form');
const KlassForm = require('./components/klass_form');
const Klass = require('./components/klass');
const AddStudySetForm = require('./components/add_study_set_form');
const StudySetIndex = require('./components/study_set_index');

const App = React.createClass({
  render(){
    return (
      <div className='app'>
        <Header/>
        <main className="main">
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
      <Route component={Content}>
        <IndexRoute component={Index}/>
        <Route path="class/:klassId" component={Klass}>
          <IndexRoute component={StudySetIndex} />
          <Route path='add_study_sets' component={AddStudySetForm} />
        </Route>
        <Route path="study_set/:id" component={StudySet}>
          <IndexRoute component={StudySetList} />
        </Route>
        <Route path="study_set_form(/:action)" component={StudySetForm} />
        <Route path="class_form(/:action)" component={KlassForm} />
      </Route>
      <Route path="login" component={LoginForm} />
      <Route path="signup" component={SignupForm} />
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
