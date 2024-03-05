

import axios from 'axios';


export interface SuccessResponse {
    data: {
      id: number;
      name: string;
    };
  
    callCount?:number
  
  }

export const getMetaAPIRequest = async (accessToken:string): Promise<SuccessResponse> => {
    
    const apiUrl = `https://graph.facebook.com/v19.0/me?access_token=${accessToken}`;
    try {
      const response = await axios.get(apiUrl);
      const xAppUsage=JSON.parse(response.headers['x-app-usage']);
      const callCount = xAppUsage?.call_count;
      
      const responseAndHeaders :SuccessResponse={
        data:response.data,
        callCount
      }

      return responseAndHeaders


    } catch (error ) {

        throw error
    }
  };


  