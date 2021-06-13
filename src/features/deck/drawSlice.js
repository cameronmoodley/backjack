import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { splitArray } from '../../helpers/utils';
import { addArray, cardValueCalculator } from '../../helpers/arrayUtils';

export const getCards = createAsyncThunk(
	'deck/getCards',
	async ({ deckId, cardCount }) => {
		return await fetch(
			`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${cardCount}`
		).then((res) => res.json());
	}
);

const drawSlice = createSlice({
	name: 'draw',
	initialState: {
		initialDraw: true,
		playerTurn: true,
		playerWon: false,
		player: {
			cards: [],
			total: 0,
		},
		dealer: {
			cards: [],
			total: 0,
		},
		status: null,
	},
	reducers: {
		aceValue(state, { payload }) {
			state.playerTurn
				? state.player.push(payload)
				: state.dealer.push(payload);
		},
		// bust() {},
		// blackJack() {},
	},
	extraReducers: {
		[getCards.pending]: (state) => {
			state.status = 'loading';
		},
		[getCards.fulfilled]: (state, { payload }) => {
			if (state.initialDraw) {
				state.initialDraw = false;
				const playerCards = splitArray(payload.cards);
				// TODO: Fix to make this dynamic
				state.dealer.cards = playerCards.cards1;
				state.player.cards = playerCards.cards3;
				state.dealer.total = addArray(
					playerCards.cards1.map((v) => cardValueCalculator(v.value))
				);
				state.player.total = addArray(
					playerCards.cards3.map((v) => cardValueCalculator(v.value))
				);
			}
		},
		[getCards.rejected]: (state) => {
			state.status = 'failed';
		},
	},
});

export const { aceValue } = drawSlice.actions;
export const drawData = (state) => state.draw;
export default drawSlice.reducer;
