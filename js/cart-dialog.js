document.addEventListener("DOMContentLoaded", () => {
  const dialog = document.querySelector(".cart-dialog")
  const openBtns = document.querySelectorAll(".cart-trigger")
  const listContainer = document.querySelector(".cart-dialog-list")
  const emptyMsg = document.querySelector(".cart-dialog-empty")
  const totalEl = document.querySelector(".cart-dialog-total-price")
  const header = document.querySelector("header")

  if (!dialog || !openBtns.length || !window.Cart) return

  function positionDialog() {
    if (!header) return
    dialog.style.top = `${Math.round(header.getBoundingClientRect().bottom)}px`
  }

  function render() {
    const cart = window.Cart.getCart()

    listContainer.innerHTML = ""

    if (cart.length === 0) {
      emptyMsg.style.display = "block"
      listContainer.style.display = "none"
    } else {
      emptyMsg.style.display = "none"
      listContainer.style.display = "block"

      cart.forEach((item) => {
        const label = item.quantity > 1 ? `${item.title} × ${item.quantity}` : item.title

        listContainer.insertAdjacentHTML("beforeend", `
          <div class="cart-dialog-item" data-id="${item.id}">
            <img class="cart-dialog-img" src="${item.image}" alt="${item.title}">
            <div class="cart-dialog-info">
              <p class="cart-dialog-brand">${label}</p>
              <p class="cart-dialog-name">${item.description ?? ""}</p>
            </div>
            <p class="cart-dialog-price">${item.price * item.quantity} kr</p>
            <button class="cart-dialog-remove" type="button" aria-label="Fjern">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        `)
      })
    }

    totalEl.textContent = `${window.Cart.getCartTotal()} kr`
  }

  openBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault()
      render()
      positionDialog()
      dialog.showModal()
    })
  })

  listContainer.addEventListener("click", (e) => {
    const removeBtn = e.target.closest(".cart-dialog-remove")
    if (!removeBtn) return

    const itemEl = e.target.closest(".cart-dialog-item")
    window.Cart.removeFromCart(itemEl.dataset.id)
    render()
  })

  // Закрити при кліку поза видимою частиною діалогу (по затемненому фону)
  dialog.addEventListener("click", (e) => {
    const rect = dialog.getBoundingClientRect()
    const clickedOutside =
      e.clientY < rect.top ||
      e.clientY > rect.bottom ||
      e.clientX < rect.left ||
      e.clientX > rect.right

    if (clickedOutside) dialog.close()
  })

  window.addEventListener("resize", () => {
    if (dialog.open) positionDialog()
  })
})
