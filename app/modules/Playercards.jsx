'use strict'

/**
 * Player cards.
 */

import React from 'react';
import ReactDOM from 'react-dom';

module.exports = React.createClass({
	displayName: 'PlayerCards',
	render: function() {
		return (
			<ul className="o-card-list">
				{this.props.playerHand.map(function(card, i) {
					const cardNum = card.slice(0, card.length-1);
					const cardSuit = card.slice(-1);
					const cardClass = "o-card o-suit-" + cardSuit + " o-num-" + cardNum;

					return (
						<li key={i} className={cardClass}>
							<span className="o-card__top-num">{cardNum}</span><br />
							<span className="o-card__bottom-num">{cardNum}</span>
						</li>
					)
			    })}
		    </ul>
		);
	}
});