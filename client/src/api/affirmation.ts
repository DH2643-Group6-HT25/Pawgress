import { INTERNAL_API_URL } from './config'

const API_URL = INTERNAL_API_URL + '/affirmation'

export async function fetchAffirmation() {
  try {
    const res = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    return await res.json()
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

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const responseText = await res.text()

    const data = JSON.parse(responseText)

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

    return await res.json()
  } catch (error) {
    console.error('Error fetching affirmation by category:', error)
    throw error
  }
}
