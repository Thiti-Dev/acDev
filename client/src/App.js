import React, { Component } from 'react';
import './App.css';
import 'hover.css/css/hover-min.css';
import 'react-awesome-button/dist/styles.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import IndexPage from './components/pages/Index/';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';

// -------------- Redux -----------------
import { Provider } from 'react-redux';
import store from './redux/store';
// --------------------------------------

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Switch>
						<Route exact path="/" component={IndexPage} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/dashboard" component={Dashboard} />
					</Switch>
				</Router>
			</Provider>
		);
	}
}
export default App;
