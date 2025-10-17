import { INTERNAL_API_URL } from './config'

const API_URL = INTERNAL_API_URL + '/users'
export async function login(email: string, password: string) {
  const res = await fetch(API_URL + '/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  })

  if (res.status == 200) return res.json()

  throw new Error('Unsuccessful Login')
}

export async function signup(email: string, password: string, name: string) {
  const res = await fetch(API_URL + '/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
    credentials: 'include',
  })

  if (res.status == 201) return res.json()

  throw new Error('Unsuccessful Signup')
}

export async function verifyToken() {
  const res = await fetch(API_URL + '/token', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })

  if (res.status == 200 && res?.ok) return

  throw new Error('Invalid Token')
}

export async function logout() {
  const res = await fetch(API_URL + '/logout', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })

  if (res.status == 200) return

  throw new Error('Unsuccessful Logout')
}
