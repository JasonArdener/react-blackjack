# JustGiving front-end recruitment test

## The test

- We would like you to build an HTML / Javascript version of the card game Black Jack (21). The rules your game should work against are outlined below.
- Build the app in this repo, using the supplied boilerplate. If you have an alternative project set-up you would prefer to use, feel free to replace the supplied boilerplate.

## Boilerplate
- The supplied boilerplate includes support for ES6, React JSX, commonJS / ES6 module syntax, Less compiling and a localhost server. Kick off the app with `gulp`. 
- We also supply global JS and CSS bundles. The JS bundle includes a full ES6 shim and DOM polfyills for `classList`, `dataset`, and `closest`. The CSS bundle includes Eric Meyer's reset and a cut-down Normalize.css. You don't need to use these if you prefer not.

## Javascript
- Please build the application in Javascript. You may have been asked by the recruiter to use a specifc library or framework. If that is the case, please **build the application using the library or framework specified**. Otherwise, please use any library or framework of your choice, or use plain old Javascript if you prefer. 
- You may use any additional third-party modules and polyfills you feel appropriate to building the application

**Bonus points**:
- At JustGiving our JS apps are increasingly built using ES6 / ES7. The supplied boilerplate includes support for these versions of Javascript, including Babel transpiling and a full ES6 shim. ES6 / ES7 features are entirely optional but any you use will receive bonus points!
- We look for well-rounded JS devs. If you can DOM-script without a library such as jQuery, this will be looked upon favourably
- Good use of commenting in your code also gets bonus points


## Modules
- Please construct your JS code from Javascript modules. The supplied gulpfile includes support for commonJS and ES6 modules. If you prefer to use another module format like AMD, you can add the relevant build tools to do so.

## CSS
 Apply some **basic** styling to your app. We are not looking for a beautiful UI or a pixel-perfect card deck, and the app doesn’t need to be responsive - we are primarily interested in how you structure your CSS.

**We strongly prefer**:
- Use of a CSS preprocessor (e.g. Less, Sass, Stylus). The boilerplate gulpfile includes a Less compiler. Feel free to swap this to a different preprocessor compiler if you prefer. Bonus points for appropriate use of mixins, variables, functions, and other preprocessor features
- Use of a CSS architecture pattern (e.g. OOCSS, BEM)

## Images
We have included some SVG images which you can use when styling your app. Deploy these images in any way you feel appropriate.


## Browser support
Your solution need not be cross-browser tested - we would expect it to run free of errors in any recent version of an evergreen browser (e.g. Chrome, Firefox, Opera).


## JS unit tests
We don’t expect you to write unit tests for your solution. However, we will look for code being written in a testable way and may ask you about testing at interview.


## Time limit
There is no time limit for completing test.


## Submitting your test
We have added you as a collaborator to this repo. Write your solution in a feature branch and **create a pull request** when you are ready to submit the test.


## Rules of the game

Your app should play against the following rules:

### Game objective
- Blackjack is played with an international 52-card deck without jokers
- The game is played between a dealer and a single player
- The aim of the game is for the player to accumulate a higher point total than the dealer, but without going over 21 points. The player computes their score by adding the values of their individual cards.

### Card values
- The cards 2 to 10 have their face value, Jack, Queen, and King are worth 10 points each, and the Ace is worth either 1 or 11 points (player's choice).

### The game
- At the start of a blackjack game, the player and the dealer receive two cards each. The player's cards are normally dealt face up, while the dealer has one face down (hidden from the player) and one face up.
- The best possible blackjack hand is an opening deal of an ace with any ten-point card. This is called a "blackjack", or a natural 21, and if the player holds this s/he automatically wins unless the dealer also has a blackjack.
- After the cards have been dealt (and if the player does not have a blackjack) the player must choose to either keep their hand as it is ('stand') or take more cards from the deck ('hit'), one at a time, until either the player judges that the hand is strong enough to go up against the dealer's hand and stands, or until it goes over 21, in which case the player immediately loses ('busts'). The player can take as many cards as s/he likes, as long as they don't bust.
- Once the player has decided to stand or has busted, the dealer turns over their second hidden card.
- If the dealer has a natural 21 (blackjack) then the player loses, unless the player also has a blackjack, in which case the games ends as a draw.
- If the dealer doesn't have a blackjack, the dealer hits (takes more cards) or stands depending on the value of the hand. Contrary to the player, the dealer's action is completely dictated by the rules. The dealer must hit if the value of the hand is lower than 17, otherwise the dealer will stand.
- If the dealer goes bust the player wins. Otherwise if the player has a higher point total than the dealer the player wins. If the player has a lower point total than the dealer the dealer wins. If the player and dealer have the same point total the game is a draw.

Good luck!
