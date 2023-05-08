/*----- constants -----*/
const open = document.querySelector('#open')
const modal_container = document.querySelector('#modal_container')
const close = document.querySelector('#close')
const startBtn = document.querySelector('#start-btn')

/*----- app's state (variables) -----*/
let round
let baronBested
let winner
let lives
/*----- cached element references -----*/

/*----- functions -----*/
const getRndmNums = () => {
  let randomNums = []
  for (let i = 0; i < round + 4; i++) {
    let randomNum = Math.floor(Math.random() * 10) + 1
    randomNums.push(randomNum)
  }
  console.log(randomNums)
}

const init = () => {
  round = 1
  baronBested = 0
  winner = null
  render()
}

const render = () => {
  renderRound()
  renderBaron()
  renderLives()
  renderReference()
}

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
