import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { splitArray } from '../../helpers/utils';

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
		player: [],
		dealer: [],
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
				state.dealer = playerCards.cards1;
				state.player = playerCards.cards3;
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
