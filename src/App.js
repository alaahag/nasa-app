import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Favorites from './components/Favorites';
import Favorite from './components/Favorite';
import Search from './components/Search';
import React from 'react';

function App() {
	//API KEY: B3wt1pr4TCgQiWQBIURpAKJTriZ2ipvpfkafpSUn
	//https://api.nasa.gov/planetary/apod?api_key=B3wt1pr4TCgQiWQBIURpAKJTriZ2ipvpfkafpSUn
	//https://api.nasa.gov/
	//https://images-api.nasa.gov/search?q=apollo&media_type=image
	return (
		<Router>
			<NavBar />
			<div className="App-header">
				<Route path="/" exact render={() => <Home /> } />
				<Route path="/favorites" exact render={() => <Favorites /> } />
				<Route path="/search" exact render={() => <Search /> } />
				<Route path="/favorite/:id" exact render={({ match }) => <Favorite match={match} />}/>
			</div>
		</Router>
	);
}

export default App;
