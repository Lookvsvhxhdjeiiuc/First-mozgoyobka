export async function fetchData() {
  try {
    const response = await fetch(
      "https://legekrogen-9n6uv.ondigitalocean.app/qandas",
    )

    const api = await response.json()

    return api.data
  } catch (error) {
    console.error("Error fetching or parsing data:", error)
  }
}