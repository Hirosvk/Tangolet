const ReactDOM = require('react-dom');
const React = require('react');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;

const SessionActions = require('./actions/session_actions');
const CurrentUserStore = require('./stores/current_user_store');

const LoginForm = require('./components/login_form');
const SignupForm = require('./components/signup_form');
const Header = require('./components/header');
const Main = require('./components/main');
const Content = require('./components/content');

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

const appRouter = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Content} />
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
