/*----- constants -----*/
const open = document.querySelector('#open')
const modal_container = document.querySelector('#modal_container')
const close = document.querySelector('#close')
const startBtn = document.querySelector('#start-btn')
const lifeCount = document.querySelector('.lives-container')
const baronCount = document.querySelector('.barons-container')
const AMMO_LOOKUP = {
  e: {
    img: '/Users/anthonymedina/SEI-R-4-24/projects/Blaster-Duel-Redemption/imgs/ammo_oj.png'
  },
  o: {
    img: '/Users/anthonymedina/SEI-R-4-24/projects/Blaster-Duel-Redemption/imgs/ammo_blue.png'
  }
}

/*----- app's state (variables) -----*/
let round
let baronBested
let winner
let lives
/*----- cached element references -----*/
const roundEl = document.querySelector('#round')
// const baronEl = document.querySelector

/*----- functions -----*/
const init = () => {
  round = 1
  baronBested = 0
  lives = 3
  winner = null
  render()
}

const handlePress = () => {
  const ammoOj = document.createElement('div')
  ammoOj.setAttribute('id', 'ammoOj')
  ammoOj.innerHTML = `<img src="${AMMO_LOOKUP.e.img}">`
  document.querySelector('#player-bar').appendChild(ammoOj)
  console.log('button')
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

const renderBaron = () => {}

const renderRef = () => {
  let randomNums = []
  const getRndmNums = () => {
    for (let i = 0; i < round + 4; i++) {
      let randomNum = Math.floor(Math.random() * 10) + 1
      randomNums.push(randomNum)
    }
    return randomNums
  }
  getRndmNums()

  randomNums.forEach((randomNum) => {
    if (randomNum % 2 === 0) {
      // IF A NUMBER IS TRUE IN ARRAY -> GENERATE DIV WITH ID ORANGE AND IMG OF OJ BUTTON
      const ammoOj = document.createElement('div')
      ammoOj.setAttribute('id', 'ammoOj')
      ammoOj.innerHTML = `<img src="${AMMO_LOOKUP.e.img}">`
      document.querySelector('#computer-bar').appendChild(ammoOj)
    } else {
      // IF NUMBER IS ODD IN ARRAY -> GENERATE DIV WITH ID BLUE AND IMG OF BLUE BUTTON
      const ammoBlue = document.createElement('div')
      ammoBlue.setAttribute('id', 'ammoBlue')
      ammoBlue.innerHTML = `<img src="${AMMO_LOOKUP.o.img}">`
      document.querySelector('#computer-bar').appendChild(ammoBlue)
    }
  })
}

// init()

/*----- event listeners -----*/

open.addEventListener('click', () => {
  modal_container.classList.add('show')
})

close.addEventListener('click', () => {
  modal_container.classList.remove('show')
})

startBtn.addEventListener('click', () => {
  window.location.href =
    '/Users/anthonymedina/SEI-R-4-24/projects/Blaster-Duel-Redemption/duel.html'
})

document.querySelector('#orange-btn').addEventListener('click', handlePress)
