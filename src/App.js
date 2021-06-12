import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Deck from './features/deck/Deck';

function App() {
	return (
		<div className='app'>
			<h1>21's</h1>
			<Deck />
		</div>
	);
}

export default App;
