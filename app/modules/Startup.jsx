'use strict'

/**
 * Display bet options.
 */

import React from 'react';
import ReactDOM from 'react-dom';

module.exports = React.createClass({
	displayName: 'Startup',
	placeBet: function(betAmount) {
		let walletAmount = this.props.wallet - betAmount;
		this.props.betPlaced(betAmount, walletAmount);
	},
	render: function() {
		return (
			<div>
				<p className="col-12 vert-margin-lg h2">Wallet: {this.props.wallet}</p>
				<p>Choose your bet.</p>
				<div className="col-12 vert-margin-lg">
					{this.props.wallet > 0 ? <div onClick={this.placeBet.bind(null, 1)} className="button">Bet 1</div> : null }
					{this.props.wallet >= 5 ? <div onClick={this.placeBet.bind(null, 5)} className="button">Bet 5</div> : null }
					{this.props.wallet >= 10 ? <div onClick={this.placeBet.bind(null, 10)} className="button">Bet 10</div> : null }

					{this.props.wallet < 1 ? <div onClick={this.props.resetGame} className="button">New Game</div> : null }
				</div>
			</div> 
		);
	}
});