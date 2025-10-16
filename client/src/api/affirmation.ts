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
