'use strict'

/**
 * Game buttons.
 */

import React from 'react';
import ReactDOM from 'react-dom';

module.exports = React.createClass({
	displayName: 'Controls',
	render: function() {
		/**
		 * Show different buttons depending on win state.
		 */
		return (
			<div>
				{this.props.winMessage === null && this.props.playerStand === false ? <button className="button" onClick={this.props.onHit.bind(null,"player")}>Hit</button> : null }
				{this.props.winMessage === null && this.props.playerStand === false ? <button className="button" onClick={this.props.onStand}>Stand</button> : null }
				{this.props.winMessage === null && this.props.playerStand === false ? <button className="button" onClick={this.props.giveUp}>Give Up</button> : null }
				{this.props.winMessage !== null ? <button className="button" onClick={this.props.endGame}>End Game</button> : null }
			</div>
		);
	}
});