import { INTERNAL_API_URL } from './config'

const API_URL = INTERNAL_API_URL + '/affirmation'

export async function fetchAffirmation() {
  try {
    const res = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies if needed
    })

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    return await res.json() // Assuming the API returns { text: "..." }
  } catch (error) {
    console.error('Error fetching affirmation:', error)
    throw error
  }
}

// Fetch categories from the backend
export async function fetchCategories() {
  try {
    const res = await fetch(`${API_URL}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    // Log the raw response object
    console.log('Raw response:', res)

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    // Log the response body as text before parsing
    const responseText = await res.text()
    console.log('Response text:', responseText)

    // Parse the response as JSON
    const data = JSON.parse(responseText)
    console.log('Parsed categories:', data) // Log the parsed data

    return data.items
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

// Fetch affirmation by category
export async function fetchAffirmationByCategory(category: string) {
  try {
    const res = await fetch(`${API_URL}/categories/${category}/random`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    return await res.json() // Assuming the API returns { text: "..." }
  } catch (error) {
    console.error('Error fetching affirmation by category:', error)
    throw error
  }
}
