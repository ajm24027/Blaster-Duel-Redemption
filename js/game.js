/*----- constants -----*/
const IMG_LOOKUP = {
  e: {
    img: '/Users/anthonymedina/SEI-R-4-24/projects/Blaster-Duel-Redemption/imgs/ammo_oj.png'
  },
  o: {
    img: '/Users/anthonymedina/SEI-R-4-24/projects/Blaster-Duel-Redemption/imgs/ammo_blue.png'
  }
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
const messageEl = document.querySelector('#splash-message')
const splashScreen = document.querySelector('.game-splash')
const refBar = document.querySelector('#computer-bar')
const playBar = document.querySelector('#player-bar')
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
  splashReset()
  render()
}

const getDuelResults = () => {
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
    } else {
      lives -= 1
      winner = 'C'
    }
    renderSplash()
  }
  if (playerArr.length !== refArr.length || playerArr.length === 0) lives -= 1
  winner = 'C'
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
  if (winner === 'P') {
    messageEl.innerText =
      'You win this round! Another victory for the fastest blaster in the galaxy.'
    splashScreen.style.visibility = 'visible'
    nextRndBtn.style.display = 'inline'
    restartBtn.style.display = 'none'
  }
  if (winner === 'C') {
    messageEl.innerText =
      "You lose this round. Don't hang you're hat up just yet!"
    splashScreen.style.backgroundColor = 'rgba(255, 0, 0, 0.4)'
    splashScreen.style.visibility = 'visible'
    nextRndBtn.style.display = 'inline'
    restartBtn.style.display = 'none'
  }
  if (lives <= 0 && winner === 'C') {
    messageEl.innerText =
      'Your trail ends here, but your legacy will live on in the stars!'
    splashScreen.style.backgroundColor = 'rgba(255, 0, 0, 0.4)'
    splashScreen.style.visibility = 'visible'
    restartBtn.style.display = 'inline'
    nextRndBtn.style.display = 'none'
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
  round += 1
  render()
  splashReset()
  playBar.innerHTML = ''
  playBar.style.visibility = 'hidden'
}

init()

/*----- event listeners -----*/

document.querySelector('#orange-btn').addEventListener('click', handlePressOj)
document.querySelector('#blue-btn').addEventListener('click', handlePressBlue)
document.querySelector('#next-round').addEventListener('click', nextRound)
document.querySelector('#restart').addEventListener('click', init)
