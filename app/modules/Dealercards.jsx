'use strict'

/**
 * Dealer cards.
 */

import React from 'react';
import ReactDOM from 'react-dom';

module.exports = React.createClass({
	displayName: 'DealerCards',
	render: function() {
		let listClass = "o-card-list";

		if (this.props.roundCount === 1) {
			listClass = "o-card-list is-round-one";
		}

		return (
			<ul className={listClass}>
				{this.props.dealerHand.map(function(card, i) {
					const cardNum = card.slice(0, card.length-1);
					const cardSuit = card.slice(-1);
					const cardClass = "o-card is-dealer-card o-suit-" + cardSuit + " o-num-" + cardNum;

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