export const splitArray = (arr) => {
	let tmpArr = [];
	let cardObj = {};
	arr.forEach((element, i) => {
		tmpArr.push(element);
		if (tmpArr.length === 2) {
			cardObj[`cards${i}`] = tmpArr;
			tmpArr = [];
		}
	});
	return cardObj;
};
