'use strict'

/**
 * Opening screen of game.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Startup from './Startup.jsx';
import Blackjack from './Blackjack.jsx';

module.exports = React.createClass({
	displayName: 'Play',
	getInitialState: function() {
		return {
			wallet: 100,
			betAmount: 0,
			startPlay: false
		};
	},
	betPlaced: function(bet, wallet) {
		this.setState({
			startPlay: true,
			wallet: wallet,
			betAmount: bet
		});
	},
	resetGame: function() {
		this.setState({
			wallet: 100
		});
	},
	endGame: function(winState) {
		let wallet = this.state.wallet;

		/**
		 * Calculate amount left in wallet.
		 */
		if (winState === 2) {
			wallet = wallet + this.state.betAmount;
		} else if (winState === 3) {
			wallet = wallet + (this.state.betAmount*2);
		}

		this.setState({
			startPlay: false,
			wallet: wallet
		});
	},
	render: function() {
		/**
		 * Show different game panel depending on whether the user has placed a beter.
		 */
		return (
			<div className="col-12">
				<h1>Blackjack</h1>
				
				{this.state.startPlay === false ? <Startup resetGame={this.resetGame} betPlaced={this.betPlaced} wallet={this.state.wallet} /> : null }
				{this.state.startPlay ? <Blackjack endGame={this.endGame} winState={this.winState} /> : null } 
			</div>
		);
	}
});