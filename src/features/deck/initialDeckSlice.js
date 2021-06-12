import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getInitialDeck = createAsyncThunk('deck/getDecks', async () => {
	return await fetch(
		`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6`
	).then((res) => res.json());
});

const initialDeckSlice = createSlice({
	name: 'desk',
	initialState: {
		deckId: null,
		status: null,
	},
	extraReducers: {
		[getInitialDeck.pending]: (state) => {
			state.status = 'loading';
		},
		[getInitialDeck.fulfilled]: (state, { payload }) => {
			state.deckId = payload.deck_id;
			state.status = 'success';
		},
		[getInitialDeck.rejected]: (state) => {
			state.status = 'failed';
		},
	},
});

export const initialDeckId = (state) => state.initialDeck;
export default initialDeckSlice.reducer;
