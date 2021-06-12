import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialDeck } from '../deck/initialDeckSlice';
import { getCards } from '../deck/drawSlice';
import { Button } from 'semantic-ui-react';

import Cards from '../cards/Cards';

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
	};

	if (initialDeck.deckId && drawData.initialDraw) {
		return (
			<Button
				positive
				onClick={() => {
					drawCard();
				}}>
				Play Black Jack
			</Button>
		);
	}

	return (
		<div>
			<h2>Dealer</h2>
			<div className='flex'>
				{drawData.dealer.map(({ image }, i) => {
					console.log(image);
					return <Cards key={i} imgSrc={image} />;
				})}
			</div>
			<h2>Player</h2>
			<div className='flex'>
				{drawData.player.map(({ image }, i) => {
					console.log(image);
					return <Cards key={i} imgSrc={image} />;
				})}
			</div>
		</div>
	);
}

export default Deck;
