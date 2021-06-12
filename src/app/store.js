import { configureStore } from '@reduxjs/toolkit';
import initialDeck from '../features/deck/initialDeckSlice';
import drawSlice from '../features/deck/drawSlice';

export const store = configureStore({
	reducer: {
		initialDeck,
		draws: drawSlice,
	},
});
