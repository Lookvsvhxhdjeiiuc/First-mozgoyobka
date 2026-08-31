export async function fetchData() {
  try {
    const response = await fetch(
      "https://legekrogen-9n6uv.ondigitalocean.app/reviews/"
    )

    const api = await response.json()

    console.log("API RESPONSE:", api)

    return api.data
  } catch (error) {
    console.error("Error fetching or parsing data:", error)
  }
}