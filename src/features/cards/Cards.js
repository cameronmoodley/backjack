import React from 'react';
import { Card, Image } from 'semantic-ui-react';

function Cards(props) {
	return (
		<Card>
			<Image src={props.imgSrc} wrapped ui={false} />
		</Card>
	);
}

export default Cards;
