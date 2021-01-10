import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Favorites from './components/Favorites';
import Favorite from './components/Favorite';
import Search from './components/Search';
import React from 'react';

function App() {
	return (
		<Router>
			<NavBar />
			<div className="App-header">
				<Switch>
					<Route path="/" exact render={() => <Home />} />
					<Route path="/favorites" exact render={() => <Favorites />} />
					<Route path="/favorite/:id" exact render={({ match }) => <Favorite match={match}/>}/>
					<Route path="/search" exact render={() => <Search />} />
					<Route render={() => <h2>Page not found!</h2>} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
