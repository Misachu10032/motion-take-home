import { getMetaAPIRequest } from "./api"
import { handleError } from "./utils/handleError"


export const makeAPICallAndLogResponse= async(accessToken:string): Promise<void> =>{
    try{
       const response= await getMetaAPIRequest(accessToken)
       console.log(response)
    }catch (error){
         handleError(error)
    
    }
}