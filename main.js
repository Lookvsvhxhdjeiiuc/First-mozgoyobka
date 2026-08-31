const burgerMenu = document.querySelector(".burger-menu")
const navMenu = document.querySelector(".nav-menu")

burgerMenu.addEventListener("click", () => {
  navMenu.classList.toggle("active")
})
const submitButton = document.querySelector(".send-btn")
const dialog = document.querySelector(".thank-you-dialog")
const closeButton = document.querySelector(".close-btn")

submitButton.addEventListener("click", () => {
  dialog.showModal()
})

closeButton.addEventListener("click", () => {
  dialog.close()
})