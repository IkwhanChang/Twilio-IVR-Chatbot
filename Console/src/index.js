import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Spinner from "./Spinner";
import registerServiceWorker from "./registerServiceWorker";

import "semantic-ui-css/semantic.min.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";

import axios from "axios";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import jwt from "jsonwebtoken";
import { setHeaders } from "./utils/ajax.js"
import rootReducer from "./reducers";
import { setUser, getUser, login, clearUser } from "./actions";

const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {
  componentDidMount() {

    axios.defaults.baseURL = process.env.REACT_APP_ENDPOINT_URI;
    const TOKEN_NAME = process.env.REACT_APP_TOKEN_NAME

    if (localStorage[TOKEN_NAME]) {
      const token = localStorage[TOKEN_NAME].split(" ")[1]
      // Set auth token header auth
      try {
        // Decode token and get user info and exp

        var decoded = jwt.verify(token, process.env.REACT_APP_SECRET);

        // Set default header
        setHeaders(token);

        // Set user and isAuthenticated
        this.props.setUser(decoded);

        this.props.history.push("/");
      } catch (err) {
        // err
        console.log(err)

        // Logout user
        this.props.clearUser();

        // Redirect to login
        this.props.history.push("/login");
      }

    } else {
      // Logout user
      this.props.clearUser();

      // Redirect to login
      this.props.history.push("/login");
    }
  }

  render() {
    return this.props.isLoading ? (
      <Spinner />
    ) : (
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      );
  }
}

const mapStateFromProps = state => ({
  isLoading: state.user.isLoading
});

const RootWithAuth = withRouter(
  connect(
    mapStateFromProps,
    { setUser, getUser, login, clearUser }
  )(Root)
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
