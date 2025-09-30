export const baseAffirmationURL: string =
  'https://affirmations-api-by-apirobots.p.rapidapi.com/v1/affirmations'

interface AffirmationHeaders {
  'x-rapidapi-key': string
  'x-rapidapi-host': string
}

function getBaseAffirmationHeaders(): AffirmationHeaders {
  if (
    process.env &&
    process.env.AFFIRMATION_KEY &&
    process.env.AFFIRMATION_HOST
  ) {
    return {
      'x-rapidapi-key': process.env.AFFIRMATION_KEY,
      'x-rapidapi-host': process.env.AFFIRMATION_HOST,
    }
  }

  console.log(
    'check env files! incorrect host or key setup for affirmation API'
  )
  return {
    'x-rapidapi-key': '',
    'x-rapidapi-host': '',
  }
}

export const baseAffirmationHeaders: AffirmationHeaders =
  getBaseAffirmationHeaders()
