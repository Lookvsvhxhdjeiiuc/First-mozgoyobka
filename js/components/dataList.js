import { fetchData } from "../api/data.js"

let data = await fetchData()

const BASE_URL = "https://legekrogen-9n6uv.ondigitalocean.app/"

export function dataList() {
  let dataListContainer = document.querySelector(".data-list-container")

  if (dataListContainer) {

    data.forEach((d) => {

      let discount = ""

      if (d.discountInPercent > 0) {
        discount = `<p class="discount">${d.discountInPercent}%</p>`
      }

      const id = d.id ?? d._id ?? encodeURIComponent(d.title)

      dataListContainer.insertAdjacentHTML("beforeend", `
        <div class="card"> 
        ${discount}
          <img src="${d.image}" alt="${d.title}">  

          <div class="tekst">  
            <p class="title">${d.title}</p>
            <p class="description">${d.description}</p>
            <br>
            <p class="price">${d.price} kr</p>
            <button
              class="add-to-cart-btn"
              type="button"
              data-id="${id}"
              data-title="${d.title}"
              data-description="${d.description}"
              data-price="${d.price}"
              data-image="${d.image}"
            >Tilføj til kurv</button>
          </div>
        </div>
      `)
    })

    dataListContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".add-to-cart-btn")
      if (!btn) return

      window.Cart.addToCart({
        id: btn.dataset.id,
        title: btn.dataset.title,
        description: btn.dataset.description,
        price: Number(btn.dataset.price),
        image: btn.dataset.image,
      })
    })
  }

  console.log(data)
}