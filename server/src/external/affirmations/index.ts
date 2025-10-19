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
async function getAffirmationByCategory(
  category: string
): Promise<BasicResponse | ErrorResponse> {
  try {
    const response = await axios.request({
      ...options,
      url: `${baseAffirmationURL}/categories/${category}/random`,
    })
    return {
      content: {
        text: response.data?.text ?? ' ',
      },
      status: 200,
    }
  } catch (error: any) {
    return {
      status: error.response?.status || 500,
      error: error.message,
    }
  }
}

async function getAffirmationCategories(): Promise<
  BasicResponse | ErrorResponse
> {
  try {
    const response = await axios.request({
      ...options,
      url: `${baseAffirmationURL}/categories`,
    })
    return {
      content: response.data, // Assuming the API returns an array of categories
      status: 200,
    }
  } catch (error: any) {
    return {
      status: error.response?.status || 500,
      error: error.message,
    }
  }
}

export default {
  getRandomAffirmation,
  getAffirmationCategories,
  getAffirmationByCategory,
}
