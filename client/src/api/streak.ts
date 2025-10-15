import { INTERNAL_API_URL } from './config'

const STREAK_URL = INTERNAL_API_URL + '/streak'

export async function getStreak() {
  const res = await fetch(STREAK_URL + `/`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Fail to fetch streaks')

  return res.json()
}

export async function updateStreak() {
  const res = await fetch(STREAK_URL + `/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Fail to update streaks')

  return res.json()
}
