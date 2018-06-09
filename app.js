/*
	GAME FUNCTION:
	- Player must guess a number between min and max
	- Player gets a certain amount of guesses
	- Notify the player of guesses remaining
	- Notify the player of the correct answer if looses
	- Let player choose to play again
*/

// Game Values
const min = 1,
			max = 10,
			winningNum = Math.floor( ( Math.random() * max ) + min );
let guessLimit = 3

// UI Elements
const UI_gameContainer = document.getElementById('game'),
			UI_minNum = document.querySelector('.min-num'),
			UI_maxNum = document.querySelector('.max-num'),
			UI_guessBtn = document.getElementById('guess-btn'),
			UI_guessInput = document.getElementById('guess-input'),
			UI_message = document.querySelector('.message');

// Assign UI Min & Max value
UI_minNum.textContent = min;
UI_maxNum.textContent = max;

// Listen for Guess Button Click event
UI_guessBtn.addEventListener( 'click', function(e) {
	const guessInput = parseInt( UI_guessInput.value );
	
	// Validate if the given guess input is < min OR > max OR is NaN (when submitted blank)
	if( isNaN( guessInput ) || guessInput < min || guessInput > max ) {
		showMessage( `Please enter a valid input between ${min} and ${max}`, 'red' );
	} else {
		// Check if the guess input is === winning number
		if( guessInput === winningNum ) {
			// Show winning msg
			showMessage( `Awesome! ${winningNum} is the correct guess`, 'green' );
			// Disable input field and the submit button
			UI_guessInput.setAttribute( 'disabled', 'disabled' );				
			// Change the Guess Button texts to PLAY AGAIN? and add play-again class to the button
			UI_guessBtn.value = 'Play Again';
			UI_guessBtn.classList.add('play-again');		
		} else {
			// When the guess input is !== winning number
			// Decrease guess limit by 1
			guessLimit--;
			// If no guess left
			if( guessLimit === 0 ) {
				// Show game over msg along with the winning number & disable the input field, submit btn
				showMessage( `Game Over! ${guessInput} is an incorrect guess. The correct number was ${winningNum}. You have ${guessLimit} tries left. Better luck next time.`, 'red' );
				UI_guessInput.setAttribute( 'disabled', 'disabled' );
				// Change the Guess Button texts to PLAY AGAIN? and add play-again class to the button
				UI_guessBtn.value = 'Play Again';
				UI_guessBtn.classList.add('play-again');
			} else {
				// User still have guess left - game continues
				// Clear the input field value
				UI_guessInput.value = '';
				// Show msg that the user given no is wrong and number of guesses left
				showMessage( `Sorry! ${guessInput} is an incorrect guess. You still have ${guessLimit} tries left.`, 'red' );
			}
		}
	}
});

// Listen for Play Again button mousedown event
UI_gameContainer.addEventListener( 'mousedown', function(e){
	if( e.target.classList.contains( 'play-again' ) ) {
		window.location.reload();
	}
});

// Function to show messages in the p.message element
function showMessage( msg, color ) {
	UI_message.textContent = msg;
	if( color !== null ) {
		UI_message.style.color = color;
		UI_guessInput.style.borderColor = color;
	}
}