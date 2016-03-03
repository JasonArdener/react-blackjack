'use strict'

/**
 * Panel for displaying win state message.
 */

import React from 'react';
import ReactDOM from 'react-dom';

module.exports = React.createClass({
	displayName: 'ResultPanel',
	render: function() {
		return (
			<div className="o-result-panel">
				{this.props.winMessage === null ? <p>Hit or Stand...</p> : null }
				{this.props.winMessage !== null ? <p>{this.props.winMessage}</p> : null }
			</div>
		);
	}
});