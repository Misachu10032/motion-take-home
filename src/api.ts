

import axios from 'axios';


interface SuccessResponse {
    data: {
      id: number;
      name: string;
    };
  }

export const getMetaAPIRequest = async (accessToken:string): Promise<SuccessResponse> => {
    
    const apiUrl = `https://graph.facebook.com/v19.0/me?access_token=${accessToken}`;
    try {
      const response = await axios.get(apiUrl);

      return response.data


    } catch (error) {

        throw error
    }
  };


  