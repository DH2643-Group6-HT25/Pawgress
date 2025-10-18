import { INTERNAL_API_URL } from './config'

const PET_URL = INTERNAL_API_URL + '/pet'
export async function postNewPet(name: string, color: string) {
  const bodyRequest = new URLSearchParams()
  bodyRequest.append('name', name)
  bodyRequest.append('color', color)
  const res = await fetch(PET_URL + '/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: bodyRequest,
    credentials: 'include',
  })
  if (res.status == 200) return res.json()
  throw new Error('Failed to create new pet')
}

export async function getPetInfo() {
  const res = await fetch(PET_URL, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })

  const result = await res.json()

  if (res.status == 200) {
    return {
      name: result?.pet?.name || '',
      color: result?.pet?.color || null,
      health: result?.pet?.health || 0,
      mood: result?.pet?.mood || null,
      food: result?.pet?.food || 0,
      currentStreak: result?.pet?.currentStreak || 0,
    }
  }

  throw new Error(result?.error?.message || 'Failed to get pet info')
}
