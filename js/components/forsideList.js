import { fetchData } from "../api/data.js"

let data = await fetchData()

export function forsideList() {
  let dataListContainer = document.querySelector(".data-list-container_forside")

  if (dataListContainer) {

    data.slice(0, 4).forEach((d) => {

      let discount = ""

      if (d.discountInPercent > 0) {
        discount = `<p class="discount">${d.discountInPercent}%</p>`
      }

      dataListContainer.insertAdjacentHTML("beforeend", `
        <div class="card"> 
        ${discount}
          <img src="${d.image}" alt="${d.title}">  

          <div class="tekst">  
            <p class="title">${d.title}</p>
            <p class="description">${d.description}</p>
            <br>
            <p class="price">${d.price} kr</p>
            
          </div>
        </div>
      `)
    })
  }
}