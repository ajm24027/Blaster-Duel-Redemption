// Variables to contain the element selectors.
const open = document.querySelector('#open')
const modal_container = document.querySelector('#modal_container')
const close = document.querySelector('#close')
const startBtn = document.querySelector('#start-btn')

// Event listeners that control Modal and Start Button.
open.addEventListener('click', () => {
  modal_container.classList.add('show')
})

close.addEventListener('click', () => {
  modal_container.classList.remove('show')
})

startBtn.addEventListener('click', () => {
  window.location.href = 'duel.html'
})
