/*----- constants -----*/
const IMG_LOOKUP = {
  e: {
    img: '/Users/anthonymedina/SEI-R-4-24/projects/Blaster-Duel-Redemption/imgs/ammo_oj.png'
  },
  o: {
    img: '/Users/anthonymedina/SEI-R-4-24/projects/Blaster-Duel-Redemption/imgs/ammo_blue.png'
  },
  restingSprite: {
    img: '/Users/anthonymedina/SEI-R-4-24/projects/Blaster-Duel-Redemption/imgs/sprite_01.png'
  },
  spriteWin: {
    img: '/Users/anthonymedina/SEI-R-4-24/projects/Blaster-Duel-Redemption/imgs/sprite_03.png'
  },
  spriteLose: {
    img: '/Users/anthonymedina/SEI-R-4-24/projects/Blaster-Duel-Redemption/imgs/sprite_02.png'
  }
}

const AUDIO_LIB = {
  gameOver: new Audio(
    '/Users/anthonymedina/SEI-R-4-24/projects/Blaster-Duel-Redemption/audio/4 - Western Adventure 8-bit Retro Game Style NES - lose fanfare.wav'
  ),
  computerWin: new Audio(
    '/Users/anthonymedina/SEI-R-4-24/projects/Blaster-Duel-Redemption/audio/sfx_player_attacked_voice.wav'
  ),
  playerWin: new Audio(
    '/Users/anthonymedina/SEI-R-4-24/projects/Blaster-Duel-Redemption/audio/sfx_enemy_headshot.wav'
  ),
  roundMusic: new Audio(
    '/Users/anthonymedina/SEI-R-4-24/projects/Blaster-Duel-Redemption/audio/3 - Western Adventure 8-bit Retro Game Style NES - gameplay2.wav'
  ),
  buttonClick: new Audio(
    '/Users/anthonymedina/SEI-R-4-24/projects/Blaster-Duel-Redemption/audio/sfx_ui_click.wav'
  ),
  fanFare: new Audio(
    '/Users/anthonymedina/SEI-R-4-24/projects/Blaster-Duel-Redemption/audio/sfx_train_honk3.wav'
  ),
  yelp: new Audio(
    '/Users/anthonymedina/SEI-R-4-24/projects/Blaster-Duel-Redemption/audio/sfx_enemy_attacked_onlyvoice.wav'
  )
}

/*----- app's state (variables) -----*/
let round
let baronsBested
let winner
let lives

/*----- cached element references -----*/
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

const renderSprite = () => {
  if (winner === null) {
    sprite.innerHTML = ''
    const spriteOpponent = document.createElement('img')
    spriteOpponent.src = `${IMG_LOOKUP.restingSprite.img}`
    sprite.appendChild(spriteOpponent)
  }
  if (winner === 'P') {
    sprite.innerHTML = ''
    const spriteOpponent = document.createElement('img')
    spriteOpponent.src = `${IMG_LOOKUP.spriteLose.img}`
    sprite.appendChild(spriteOpponent)
  }
  if (winner === 'C') {
    sprite.innerHTML = ''
    const spriteOpponent = document.createElement('img')
    spriteOpponent.src = `${IMG_LOOKUP.spriteWin.img}`
    sprite.appendChild(spriteOpponent)
  }
}

const getDuelResults = () => {
  AUDIO_LIB.roundMusic.pause()
  AUDIO_LIB.roundMusic.currentTime = 0
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
  if (playerArr.length !== refArr.length || playerArr.length === 0) {
    lives -= 1
    winner = 'C'
  } else return
  renderSplash()
}

const handlePressOj = () => {
  if (playBar.style.visibility !== 'visible') return
  if (playerArr.length === refArr.length) return
  const ammoOj = document.createElement('div')
  ammoOj.setAttribute('id', 'ammoOj')
  ammoOj.innerHTML = `<img src="${IMG_LOOKUP.e.img}">`
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

const render = () => {
  renderRound()
  renderBaron()
  renderLives()
  renderRef()
  renderSprite()
  refArr = [...document.querySelectorAll('#computer-bar > div')]
  playerArr = [...document.querySelectorAll('#player-bar > div')]
}

const renderRound = () => {
  roundEl.innerText = `Round ${round}`
}

const renderBaron = () => {
  baronBucket.innerHTML = ''
  for (let i = 0; i < baronsBested; i++) {
    const barons = document.createElement('img')
    barons.src =
      '/Users/anthonymedina/SEI-R-4-24/projects/Blaster-Duel-Redemption/imgs/barons-icon.png'
    baronBucket.appendChild(barons)
  }
}

const renderLives = () => {
  lifeBucket.innerHTML = ''
  for (let i = 0; i < lives; i++) {
    const life = document.createElement('img')
    life.src =
      '/Users/anthonymedina/SEI-R-4-24/projects/Blaster-Duel-Redemption/imgs/lives-icon.png'
    lifeBucket.appendChild(life)
  }
}

const renderSplash = () => {
  if (winner === null) {
    splashScreen.style.visibility = 'visible'
    startBtn.style.display = 'inline'
    messageEl.innerText =
      "Become the fastest gun in Wild Space by dueling evil Space Barons who want to take your family's land."
  }
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

const splashReset = () => {
  splashScreen.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
  splashScreen.style.visibility = 'hidden'
}

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
  setTimeout(() => {
    refBar.style.visibility = 'hidden'
    playBar.style.visibility = 'visible'
    setTimeout(() => {
      refBar.style.visibility = 'visible'
      getDuelResults()
    }, 4000)
  }, 4000)
}

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
