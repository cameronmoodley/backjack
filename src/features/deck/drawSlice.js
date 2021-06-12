import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
			// Todo add in checks
			console.log(payload);
			state.initialDraw = false;
		},
		[getCards.rejected]: (state) => {
			state.status = 'failed';
		},
	},
});

export const { aceValue } = drawSlice.actions;
export const drawData = (state) => state.draw;
export default drawSlice.reducer;
