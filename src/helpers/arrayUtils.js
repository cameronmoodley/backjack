export const cardValueCalculator = (card) => {
	let value;
	switch (card) {
		case 'KING':
		case 'QUEEN':
		case 'JACK':
			value = 10;
			break;
		case 'ACE':
			value = 11;
			break;
		default:
			value = parseInt(card);
			break;
	}
	return value;
};

export const addArray = (arr) => {
	return arr.reduce(
		(a, b) => cardValueCalculator(a.value) + cardValueCalculator(b.value)
	);
};
