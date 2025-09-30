import axios from 'axios'
import { baseAffirmationURL, baseAffirmationHeaders } from './config'
import { BasicResponse, ErrorResponse } from '../../@types/response'

const options = {
  method: 'GET',
  url: baseAffirmationURL + '/random',
  headers: {
    ...baseAffirmationHeaders,
  },
}

async function getRandomAffirmation(): Promise<BasicResponse | ErrorResponse> {
  try {
    const response = await axios.request(options)
    return {
      content: {
        text: response.data?.text ?? ' ',
      },
      status: 200,
    }
  } catch (error: any) {
    return {
      status: error.status,
      error: error.message,
    }
  }
}

export default getRandomAffirmation
