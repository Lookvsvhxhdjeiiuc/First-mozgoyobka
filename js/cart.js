// Простий кошик на localStorage. Не є ES-модулем навмисно,
// щоб window.Cart був доступний і зі звичайних <script>, і з type="module".
(function () {
  const CART_KEY = "legekrogen_cart"

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || []
    } catch (e) {
      return []
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
    updateCartBadge()
  }

  // item: { id, title, description, price, image }
  function addToCart(item) {
    const cart = getCart()
    const existing = cart.find((c) => c.id === item.id)

    if (existing) {
      existing.quantity += 1
    } else {
      cart.push({ ...item, quantity: 1 })
    }

    saveCart(cart)
  }

  function removeFromCart(id) {
    const cart = getCart().filter((c) => c.id !== id)
    saveCart(cart)
  }

  function updateQuantity(id, quantity) {
    const cart = getCart()
    const item = cart.find((c) => c.id === id)

    if (!item) return

    if (quantity <= 0) {
      return removeFromCart(id)
    }

    item.quantity = quantity
    saveCart(cart)
  }

  function getCartCount() {
    return getCart().reduce((sum, c) => sum + c.quantity, 0)
  }

  function getCartTotal() {
    return getCart().reduce((sum, c) => sum + c.price * c.quantity, 0)
  }

  function updateCartBadge() {
    const badges = document.querySelectorAll(".cart-count")
    const count = getCartCount()
    badges.forEach((badge) => (badge.textContent = count))
  }

  window.Cart = {
    getCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartCount,
    getCartTotal,
    updateCartBadge,
  }

  document.addEventListener("DOMContentLoaded", updateCartBadge)
})()
