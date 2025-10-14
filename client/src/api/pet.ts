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
  return res.json()
}
