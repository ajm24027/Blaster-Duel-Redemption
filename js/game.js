/*----- Image & Audio Library Constants -----*/
const IMG_LOOKUP = {
  e: { img: 'imgs/ammo_oj.png' },
  o: { img: 'imgs/ammo_blue.png' },
  restingSprite: { img: 'imgs/sprite_01.png' },
  spriteWin: { img: 'imgs/sprite_03.png' },
  spriteLose: { img: 'imgs/sprite_02.png' }
}

const AUDIO_LIB = {
  gameOver: new Audio(
    'audio/4 - Western Adventure 8-bit Retro Game Style NES - lose fanfare.wav'
  ),
  computerWin: new Audio('audio/sfx_player_attacked_voice.wav'),
  playerWin: new Audio('audio/sfx_enemy_headshot.wav'),
  roundMusic: new Audio(
    'audio/3 - Western Adventure 8-bit Retro Game Style NES - gameplay2.wav'
  ),
  buttonClick: new Audio('audio/sfx_ui_click.wav'),
  fanFare: new Audio('audio/sfx_train_honk3.wav'),
  yelp: new Audio('audio/sfx_enemy_attacked_onlyvoice.wav')
}

/*----- App's State (Variables) -----*/
let round
let baronsBested
let winner
let lives

/*----- Cached Element References -----*/
const lifeBucket = document.querySelector('.lives-bucket')
const baronBucket = document.querySelector('.baron-bucket')
const roundEl = document.querySelector('#round')
const restartBtn = document.querySelector('#restart')
const nextRndBtn = document.querySelector('#next-round')
const startBtn = document.querySelector('#start')
const messageEl = document.querySelector('#splash-message')
const splashScreen = document.querySelector('.game-splash')
const refBar = document.querySelector('#computer-bar')
const playBar = document.querySelector('#player-bar')
const sprite = document.querySelector('#sprite-container')
let refArr = [...document.querySelectorAll('#computer-bar > div')]
let playerArr = [...document.querySelectorAll('#player-bar > div')]

/*----- functions -----*/

// Sets game state variables, renders the initial elements from duel.html
const init = () => {
  round = 1
  baronsBested = 0
  lives = 3
  winner = null
  playBar.innerHTML = ''
  playBar.style.visibility = 'hidden'
  AUDIO_LIB.roundMusic.play()
  renderSprite()
  splashReset()
  render()
}

// Called by renderSplash (display round results). Access IMG_LOOKUP and displays the sprite respective to the Winner Variable.
const renderSprite = () => {
  // If no winner, render the initial sprite.
  if (winner === null) {
    sprite.innerHTML = ''
    const spriteOpponent = document.createElement('img')
    spriteOpponent.src = `${IMG_LOOKUP.restingSprite.img}`
    sprite.appendChild(spriteOpponent)
  }
  // If winner is the player, render the spriteLose sprite.
  if (winner === 'P') {
    sprite.innerHTML = ''
    const spriteOpponent = document.createElement('img')
    spriteOpponent.src = `${IMG_LOOKUP.spriteLose.img}`
    sprite.appendChild(spriteOpponent)
  }
  // If winner is the computer, render the spriteWin sprite.
  if (winner === 'C') {
    sprite.innerHTML = ''
    const spriteOpponent = document.createElement('img')
    spriteOpponent.src = `${IMG_LOOKUP.spriteWin.img}`
    sprite.appendChild(spriteOpponent)
  }
}

// Called by renderRef, decides if player wins or loses after comparing the contents of the computer bar and the player bar.
const getDuelResults = () => {
  AUDIO_LIB.roundMusic.pause()
  AUDIO_LIB.roundMusic.currentTime = 0
  // If player has put in enough ammunition, the game takes the divs of the computer & player bar and puts them into divs.
  if (playerArr.length === refArr.length) {
    playerArr = [...document.querySelectorAll('#player-bar > div')].map(
      (item) => {
        return item.innerHTML
      }
    )
    refArr = [...document.querySelectorAll('#computer-bar > div')].map(
      (item) => {
        return item.innerHTML
      }
    )
    // Takes the contents of the above arrays and compares them, serving up the proper round ending based on the results.
    if (JSON.stringify(playerArr) === JSON.stringify(refArr)) {
      baronsBested += 1
      winner = 'P'
      sprite.innerHTML = '<img src="${IMG_LOOKUP.spriteLose}"></img>'
    } else {
      lives -= 1
      winner = 'C'
      sprite.innerHTML = '<img src="${IMG_LOOKUP.spriteWin}"></img>'
    }
    renderSplash()
  }
  // If player doesn't put in enough ammunition they lose because if the lengths don't match, player 100% doesn't have the correct pattern.
  if (playerArr.length !== refArr.length || playerArr.length === 0) {
    lives -= 1
    winner = 'C'
  } else return
  renderSplash()
}

// The function that is called when the console controls are pushed.
const handlePressOj = () => {
  // Prevents the player from getting a head start or accidentally putting in more ammo than needed.
  if (playBar.style.visibility !== 'visible') return
  if (playerArr.length === refArr.length) return
  // Creates a div stored in a varable called ammo*.
  const ammoOj = document.createElement('div')
  // Sets the ID of the div to ammo* (for comparison purposes)
  ammoOj.setAttribute('id', 'ammoOj')
  // Sets the innerHTML of the div to an image stored in the IMG_LOOKUP.
  ammoOj.innerHTML = `<img src="${IMG_LOOKUP.e.img}">`
  // Adds the right image to the player bar.
  document.querySelector('#player-bar').appendChild(ammoOj)
  playerArr = [...document.querySelectorAll('#player-bar > div')]
}

const handlePressBlue = () => {
  if (playBar.style.visibility !== 'visible') return
  if (playerArr.length === refArr.length) return
  const ammoBlue = document.createElement('div')
  ammoBlue.setAttribute('id', 'ammoBlue')
  ammoBlue.innerHTML = `<img src="${IMG_LOOKUP.o.img}">`
  document.querySelector('#player-bar').appendChild(ammoBlue)
  playerArr = [...document.querySelectorAll('#player-bar > div')]
}

// Stores all of the render functions that need to fire off at different times.
const render = () => {
  renderRound()
  renderBaron()
  renderLives()
  renderRef()
  renderSprite()
  // Here to provide the correct targets for renderRef.
  refArr = [...document.querySelectorAll('#computer-bar > div')]
  playerArr = [...document.querySelectorAll('#player-bar > div')]
}

const renderRound = () => {
  roundEl.innerText = `Round ${round}`
}

// Appends the barons-icon.png to the div baronBucket for every baronBested.
const renderBaron = () => {
  baronBucket.innerHTML = ''
  for (let i = 0; i < baronsBested; i++) {
    const barons = document.createElement('img')
    barons.src = 'imgs/barons-icon.png'
    baronBucket.appendChild(barons)
  }
}

const renderLives = () => {
  lifeBucket.innerHTML = ''
  for (let i = 0; i < lives; i++) {
    const life = document.createElement('img')
    life.src = 'imgs/lives-icon.png'
    lifeBucket.appendChild(life)
  }
}

// Ends the game, and displays the combination of splash screen and opponent sprite on the duel page based on the state of the Winner.
// Also used to bypass certain browser AutoPlay Policies. Bad user experience, but the players need to be immersed.
const renderSplash = () => {
  // Beginning splash
  if (winner === null) {
    splashScreen.style.visibility = 'visible'
    startBtn.style.display = 'inline'
    messageEl.innerText =
      "Become the fastest gun in Wild Space by dueling evil Space Barons who want to take your family's land."
  }
  // Player Win Splash
  if (winner === 'P') {
    AUDIO_LIB.computerWin.play()
    AUDIO_LIB.fanFare.play()
    messageEl.innerText =
      'You win this round! Another victory for the fastest blaster in the galaxy.'
    splashScreen.style.visibility = 'visible'
    nextRndBtn.style.display = 'inline'
    restartBtn.style.display = 'none'
    startBtn.style.display = 'none'
    renderSprite()
  }
  // Computer Win Splash
  if (winner === 'C') {
    AUDIO_LIB.playerWin.play()
    AUDIO_LIB.yelp.play()
    messageEl.innerText =
      "You lose this round. Don't hang you're hat up just yet!"
    splashScreen.style.backgroundColor = 'rgba(255, 0, 0, 0.4)'
    splashScreen.style.visibility = 'visible'
    nextRndBtn.style.display = 'inline'
    restartBtn.style.display = 'none'
    startBtn.style.display = 'none'
    renderSprite()
  }
  // Game Over Splash
  if (lives <= 0 && winner === 'C') {
    AUDIO_LIB.gameOver.play()
    messageEl.innerText =
      'Your trail ends here, but your legacy lives on in the stars!'
    splashScreen.style.backgroundColor = 'rgba(255, 0, 0, 0.4)'
    splashScreen.style.visibility = 'visible'
    restartBtn.style.display = 'inline'
    nextRndBtn.style.display = 'none'
    renderSprite()
  }
}

// Needed a way to reset the splash screen after every round (if player loses, I don't want the splash screen to still have lose styling if they win following round)
const splashReset = () => {
  splashScreen.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
  splashScreen.style.visibility = 'hidden'
}

// The star of the show. Generates a random number between 1 - 10 and pushes the interger to an Array.
const renderRef = () => {
  document.querySelector('#computer-bar').innerHTML = ''
  let randomNums = []
  const getRndmNums = () => {
    for (let i = 0; i < round + 2; i++) {
      let randomNum = Math.floor(Math.random() * 10) + 1
      randomNums.push(randomNum)
    }
    return randomNums
  }
  getRndmNums()

  // For each number in the array, decides if the number is even/odd, and like handlePress, assigns an img - Orange(even)/Blue(odd) - to a div and puts that div/img in the computer bar.
  randomNums.forEach((randomNum) => {
    if (randomNum % 2 === 0) {
      const ammoOj = document.createElement('div')
      ammoOj.setAttribute('id', 'ammoOj')
      ammoOj.innerHTML = `<img src="${IMG_LOOKUP.e.img}">`
      document.querySelector('#computer-bar').appendChild(ammoOj)
    } else {
      const ammoBlue = document.createElement('div')
      ammoBlue.setAttribute('id', 'ammoBlue')
      ammoBlue.innerHTML = `<img src="${IMG_LOOKUP.o.img}">`
      document.querySelector('#computer-bar').appendChild(ammoBlue)
    }
  })
  // Kicks off and mediates the round. First 4 seconds shows the computer bar, second 4 seconds hids computer and shows player bar. After both 4 second intervals elapse show the player both bars and decide the winner.
  setTimeout(() => {
    refBar.style.visibility = 'hidden'
    playBar.style.visibility = 'visible'
    setTimeout(() => {
      refBar.style.visibility = 'visible'
      getDuelResults()
    }, 4000)
  }, 4000)
}

// Updates game states vs resetting them (init) and resets the "board" for the next round.
const nextRound = () => {
  winner = null
  round += 1
  render()
  splashReset()
  playBar.innerHTML = ''
  playBar.style.visibility = 'hidden'
  AUDIO_LIB.buttonClick.play()
  AUDIO_LIB.roundMusic.play()
}

// Used to give the player a moment beforet they start the game, and bypasses browser Autoplay policies.
const gameLoad = () => {
  winner = null
  renderSplash()
}

gameLoad()

/*----- event listeners -----*/

document.querySelector('#orange-btn').addEventListener('click', handlePressOj)
document.querySelector('#blue-btn').addEventListener('click', handlePressBlue)
document.querySelector('#next-round').addEventListener('click', nextRound)
document.querySelector('#restart').addEventListener('click', init)
document.querySelector('#start').addEventListener('click', init)
