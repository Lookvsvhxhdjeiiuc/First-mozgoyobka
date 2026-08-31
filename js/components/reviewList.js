import { fetchData } from "../api/review.js"

const review = await fetchData()

export function reviewList() {
  const reviewListContainer = document.querySelector(
    ".review-customers-container"
  )

  console.log("Reviews:", review)
  console.log("Container:", reviewListContainer)

  if (!reviewListContainer) {
    console.log("Container not found")
    return
  }

  review?.forEach((g) => {
    reviewListContainer.insertAdjacentHTML(
      "beforeend",
      `
        <div class="review-card">
          <p class="descriptions">"${g.description}"</p>
          <p class="name">${g.name}</p>
        </div>
      `
    )
  })
}