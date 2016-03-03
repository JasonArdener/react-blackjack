'use strict'

/**
 * Entry point to main game. Main game logic.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import DealerCards from './Dealercards.jsx';
import PlayerCards from './Playercards.jsx';
import ResultPanel from './Resultpanel.jsx';
import Controls from './Controls.jsx';

module.exports = React.createClass({
	displayName: 'Blackjack',
	getInitialState: function() {
		return {
			deck: [],
			dealerHand: [],
			playerHand: [],
			winMessage: null,
			roundCount: 1,
			playerStand: false,
			dealerCount: 0,
			playerCount: 0,
			winState: 0
		};
	},
	createDeck: function() {
		const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
		const suits = ["C", "D", "H", "S"];
		let cards = [],
			i, j;

		for(i=0; i<ranks.length; i++) {
			for(j=0; j<suits.length; j++) {
				cards.push(ranks[i]+suits[j]);
			}
		}

		this.setState({
			deck: cards,
			roundCount: 1,
			winMessage: null,
			playerStand: false
		}, function(){
			this.startGame();
		});
	},
	startGame: function() {
		let dealerCards = [];
		let playerCards = [];

		dealerCards.push(this.dealCard());
		dealerCards.push('');
		playerCards.push(this.dealCard());
		playerCards.push(this.dealCard());
		
		this.setState({
			dealerHand: dealerCards,
			playerHand: playerCards,
			dealerCount: this.countCards(dealerCards),
			playerCount: this.countCards(playerCards)
		});
	},
	dealEmptyCard: function() {
		// Deal an empty card to include face down card at start.
		this.setState({
			deck: deck
		});
		return cardId;
	},
	dealCard: function() {
		var deck = this.state.deck;
		var cardId = deck[Math.floor(Math.random() * deck.length)];
		deck.splice(cardId, 1);
		this.setState({
			deck: deck
		});
		return cardId;
	},
	componentDidMount: function() {
		this.createDeck();
	},
	onHit: function(player) {
		let playerCards = this.state.playerHand;
		let dealerCards = this.state.dealerHand;

		playerCards.push(this.dealCard());

		this.setState({
			playerHand: playerCards,
		}, function (){
			this.checkForWin();
		});
	},
	onStand: function() {
		let dealerCards = this.state.dealerHand;
		let blackjack = this;

		if(this.checkForWin() !== null) {
			return;
		}

		dealerCards.push(this.dealCard());

		this.setState({
			dealerHand: dealerCards,
			roundCount: this.state.roundCount + 1,
			playerStand: true
		}, function (){
			if (this.checkForWin() === null || this.countCards(this.state.dealerHand) < 17) {
				setTimeout(function(){ blackjack.onStand(); }, 1000);
			}
		});
	},
	checkForWin: function() {
		const dealerCount = this.countCards(this.state.dealerHand);
		const playerCount = this.countCards(this.state.playerHand);
		const dealerHandCount = this.state.dealerHand.length - 1;
		const playerHandCount = this.state.playerHand.length;
		let winMessage = null;
		let winState = null;

		if (playerCount === 21 && playerHandCount === 2 && dealerCount !== 21) {
			winMessage = "Player wins with a Blackjack!";
			winState = 3;
		} else if (dealerCount === 21 && dealerHandCount === 2) {
			winMessage = "Dealer wins with a Blackjack!"
			winState = 1;
		} else if (dealerCount === 21 || playerCount > 21) {
			winMessage = "Dealer wins.";
			winState = 1;
		} else if (dealerCount > 21 || playerCount === 21) {
			winMessage = "You win!";
			winState = 3;
		} else if (dealerCount === 21 && playerCount === 21) {
			winMessage = "It's a draw...";
			winState = 2;
		} else if (this.state.playerStand === true && (dealerCount > playerCount && dealerCount >= 17)) {
			winMessage = "Dealer wins.";
			winState = 1;
		}

		this.setState({ 
			winMessage: winMessage,
			winState: winState,
			dealerCount: dealerCount,
			playerCount: playerCount
		});

		return winMessage;
	},
	countCards: function(cards) {
		const cardsLength = cards.length;
		let i;
		let cardCount = 0;
		let aceCount = 0;

		for(i=0; i<cardsLength; i++) {
			let cardNum = cards[i].slice(0, cards[i].length-1);

			// Assign different score depending on card type.
			if (cardNum === "K" || cardNum === "Q" || cardNum === "J") {
				cardCount = cardCount + 10;
			} else if (cardNum === "A") {
				cardCount = cardCount + 11;
				aceCount++;
			} else {
				cardCount = cardCount + Number(cardNum);
			}
		}

		//If there is an ace and the score is over 21, count each ace as a 1 until under 21.
		if (aceCount > 0 && cardCount > 21) {
			let j;

			for(j=0; j<aceCount; j++) {
				if(cardCount > 21) {
					cardCount = cardCount - 10;
				} else {
					break;
				}
			}
		}

		return cardCount;
	},
	giveUp: function() {
		this.setState({
			winMessage: "You have given up..."
		});
	},
	endGame: function() {
		this.props.endGame(this.state.winState);
	},
	render: function() {
		return (
			<div>
				<h2>Dealer</h2>
				<DealerCards dealerHand={this.state.dealerHand} roundCount={this.state.roundCount} />
				<p>{this.state.dealerCount}</p>
				<ResultPanel winMessage={this.state.winMessage} />
				<p>{this.state.playerCount}</p>
				<PlayerCards playerHand={this.state.playerHand} />
				<Controls endGame={this.endGame} onHit={this.onHit} giveUp={this.giveUp} createDeck={this.createDeck} onStand={this.onStand} winMessage={this.state.winMessage} playerStand={this.state.playerStand} />
				<h2>You</h2>
			</div>
		);
	}
});