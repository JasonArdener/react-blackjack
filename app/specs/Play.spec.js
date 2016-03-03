import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Play from '../modules/Play.jsx';

describe('play init', function () {
    var instance;

    beforeEach(function() {
      instance = TestUtils.renderIntoDocument(<Play />);
    });

    // A pointless test for ensuring Karma is running correctly...
    it('has the correct header content', function () {
        var heading = TestUtils.findRenderedDOMComponentWithTag(instance, "h1");
        expect(React.findDOMNode(heading).textContent).toBe("Blackjack");
    });

    it('has 100 currency in wallet', function () {
        var wallet = instance.state.wallet;
        expect(wallet).toBe(100);
    });

    it('does not start game automatically', function () {
        var startPlay = instance.state.startPlay;
        expect(startPlay).toBe(false);
    });
});
