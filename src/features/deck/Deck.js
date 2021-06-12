import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialDeck } from '../deck/initialDeckSlice';
import { getCards } from '../deck/drawSlice';
import { Button } from 'semantic-ui-react';

function Deck() {
	const dispatch = useDispatch();
	const initialDeck = useSelector((state) => state.initialDeck);
	const drawData = useSelector((state) => state.draws);

	useEffect(() => {
		dispatch(getInitialDeck());
	}, [dispatch]);

	const drawCard = () => {
		dispatch(
			getCards({
				deckId: initialDeck.deckId,
				cardCount: drawData.initialDraw ? '4' : '1',
			})
		);
		console.log('it weks');
	};

	return (
		<div>
			{initialDeck.deckId && (
				<Button
					positive
					onClick={() => {
						drawCard();
					}}>
					Draw Cards
				</Button>
			)}
		</div>
	);
}

export default Deck;
