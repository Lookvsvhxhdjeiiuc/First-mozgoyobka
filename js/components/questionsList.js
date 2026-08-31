import { fetchData } from "../api/questions.js"

const questions = await fetchData()

const BASE_URL = "https://legekrogen-9n6uv.ondigitalocean.app/"

export function questionsList() {
  let questionsListContainer = document.querySelector(".message")

  if (questionsListContainer) {

    questions.forEach((d) => {


      questionsListContainer.insertAdjacentHTML("beforeend", `
       <div class="accordion">
  <details>
    <summary>
      <span>${d.question}</span>
      <i class="fa-solid fa-chevron-down"></i>
    </summary>

    <p>${d.answer}</p>
  </details>
</div>
<br>
      `)
    })
  }
}