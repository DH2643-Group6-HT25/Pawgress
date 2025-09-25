import axios from 'axios'
import { baseAffirmationURL, baseAffirmationHeaders } from './config';

const options = {
  method: 'GET',
  url: baseAffirmationURL + '/random',
  headers: {
    ...baseAffirmationHeaders
  }
}

async function getRandomAffirmation(){
  try {
    const response = await axios.request(options);
    return {
      result: {
        text: response.data?.text ?? " ",
      },
      status: 200
    }
  } catch (error) {
    return {
      status: error.status,
      result: {
        error: error.message
      }
    }
  }
}

export default getRandomAffirmation;
