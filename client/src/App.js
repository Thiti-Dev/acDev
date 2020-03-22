import React, { Component } from 'react';
import './App.css';
import 'hover.css/css/hover-min.css';
import 'react-awesome-button/dist/styles.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import IndexPage from './components/pages/Index/IndexPage';

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={IndexPage} />
				</Switch>
			</Router>
		);
	}
}
export default App;
