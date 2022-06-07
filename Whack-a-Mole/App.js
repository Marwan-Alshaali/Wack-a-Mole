const squares = document.querySelectorAll('.square')	//array of the 9 squares
const mole = document.querySelector('.mole')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')

let result = 0
let hitPosition
let currentTime = 10
let timerID = null

function randomSquare() {
	squares.forEach(square => {			//"forEach" means for every [square] in 
										//the sqaures array defined above (querySelectorAll)
		square.classList.remove('mole')	//removes all moles in all squares
	})

	let randomSquare = squares[Math.floor(Math.random() * 9)]
	randomSquare.classList.add('mole')

	//saving the ID of the square that we want to hit
	hitPosition = randomSquare.id
}

//always checking if a sqaure is being clicked
squares.forEach(square => {
	square.addEventListener('mousedown', () => {
		//compare ID of clicked square with the ID of the square with the mole
		if(square.id == hitPosition) {
			result++					//hit detected, add to result
			score.textContent = result	//change displayed score to match result
			hitPosition = null			//so that you can only hit a sqaure once
		}
	})
})

function moveMole() {
	//calls randomSquare() every 500ms
	timerID = setInterval(randomSquare, 500)
}

//will start moving the mole
moveMole()

//will keep removing a second from the time available each second
//the time available will then be updated and displayed to the player
function countDown() {
	currentTime--						//remove a second from the time available
	timeLeft.textContent = currentTime	//update displayed time left

	//if the player's time is done
	if(currentTime == 0) {
		//stops the timer
		clearInterval(countDownTimerID)	//will stop the countdown
		clearInterval(timerID)			//will stop creating new squares

		//waits 100ms before displaying the function
		setTimeout( () => {
			alert("GAME OVER! Your final score is: " + result)
		}, 100)
	}
}

//timer which calls countDown every second
let countDownTimerID = setInterval(countDown, 1000)