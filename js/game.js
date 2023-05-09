/*----- constants -----*/
const lifeBucket = document.querySelector('.lives-bucket')
const baronBucket = document.querySelector('.baron-bucket')
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
const roundEl = document.querySelector('#round')

/*----- functions -----*/
const init = () => {
  round = 1
  baronsBested = 0
  lives = 3
  winner = null
  render()
}

const handlePressOj = () => {
  const ammoOj = document.createElement('div')
  ammoOj.setAttribute('id', 'ammoOj')
  ammoOj.innerHTML = `<img src="${IMG_LOOKUP.e.img}">`
  document.querySelector('#player-bar').appendChild(ammoOj)
  barrelCheck()
}

const handlePressBlue = () => {
  const ammoBlue = document.createElement('div')
  ammoBlue.setAttribute('id', 'ammoBlue')
  ammoBlue.innerHTML = `<img src="${IMG_LOOKUP.o.img}">`
  document.querySelector('#player-bar').appendChild(ammoBlue)
  barrelCheck()
}

const barrelCheck = () => {
  const computerChoice = document.querySelector('#computer-bar')
  const refArr = Array.from(computerChoice.querySelectorAll('*'))
  const playerChoice = document.querySelector('#player-bar')
  const playerArr = Array.from(playerChoice.querySelectorAll('*'))
  if (playerArr.length == refArr.length) {
    getDuelResults()
  }
  return
}

const getDuelResults = () => {
  const computerChoice = document.querySelector('#computer-bar')
  const refArr = Array.from(computerChoice.querySelectorAll('*'))
  const playerChoice = document.querySelector('#player-bar')
  const playerArr = Array.from(playerChoice.querySelectorAll('*'))
  if (playerArr == refArr) {
    baronsBested += 1
    winner = 'P'
    renderMessage()
  } else {
    lives -= 1
    winner = 'C'
    renderMessage()
  }
}

const render = () => {
  renderRound()
  renderBaron()
  renderLives()
  renderRef()
}

const renderRound = () => {
  roundEl.innerText = `Round ${round}`
}

const renderBaron = () => {
  for (let i = 0; i < baronsBested; i++) {
    const barons = document.createElement('img')
    barons.src =
      '/Users/anthonymedina/SEI-R-4-24/projects/Blaster-Duel-Redemption/imgs/barons-icon.png'
    baronBucket.appendChild(barons)
  }
}

const renderLives = () => {
  for (let i = 0; i < lives; i++) {
    const life = document.createElement('img')
    life.src =
      '/Users/anthonymedina/SEI-R-4-24/projects/Blaster-Duel-Redemption/imgs/lives-icon.png'
    lifeBucket.appendChild(life)
  }
}

const renderRef = () => {
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
}

// init()

/*----- event listeners -----*/

document.querySelector('#orange-btn').addEventListener('click', handlePressOj)
document.querySelector('#blue-btn').addEventListener('click', handlePressBlue)
