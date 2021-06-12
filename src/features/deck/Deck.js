import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialDeck } from '../deck/initialDeckSlice';
import { Button } from 'semantic-ui-react';

function Deck() {
	const dispatch = useDispatch();
	const initialDeck = useSelector((state) => state.initialDeck);

	useEffect(() => {
		dispatch(getInitialDeck());
	}, [dispatch]);
	return (
		<div>{initialDeck.deckId && <Button positive>Draw Cards</Button>}</div>
	);
}

export default Deck;
