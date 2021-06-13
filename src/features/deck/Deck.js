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
			<h3>Card Total: {drawData.dealer.total}</h3>
			<div className='flex'>
				{drawData.dealer.cards.map(({ image }, i) => {
					return <Cards key={i} imgSrc={image} />;
				})}
			</div>
			<h2>Player</h2>
			<h3>Card Total: {drawData.player.total}</h3>
			<div className='flex'>
				{drawData.player.cards.map(({ image }, i) => {
					return <Cards key={i} imgSrc={image} />;
				})}
			</div>
			<div className='flex'>
				<Button
					positive
					onClick={() => {
						console.log('Hit me forest');
					}}>
					Hit
				</Button>
				<Button
					positive
					onClick={() => {
						console.log('Stood');
					}}>
					Stand
				</Button>
			</div>
		</div>
	);
}

export default Deck;
