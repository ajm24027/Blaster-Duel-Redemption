const open = document.querySelector('#open')
const modal_container = document.querySelector('#modal_container')
const close = document.querySelector('#close')
const startBtn = document.querySelector('#start-btn')

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
