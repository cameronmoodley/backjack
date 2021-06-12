import { configureStore } from '@reduxjs/toolkit';
import initialDeck from '../features/deck/initialDeckSlice';

export const store = configureStore({
	reducer: {
		initialDeck,
	},
});
