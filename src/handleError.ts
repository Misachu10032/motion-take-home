
import { exponentialBackoff } from "./utils/exponentialBackoffHelper";

export enum ErrorMessage {
    rateLimitErrorMessage = 'You have hit the rate limit',
    authErrorMessage = 'the token is expired',
    otherErrorMessage = 'something else went wrong',
}

enum ErrorCode {
    rateLimitErrorCode = 4, //Error code sent by Meta when
    authErrorCode = 190
}

interface AxiosError {
    response?: {
        data?: {
            error?:
            {
                message?: string,
                code?: number
            }

        };

    };
}

// This will Identify and return type of Error is encountered. 
//If the error is rate limit error, it will implement an exponential backoff
export const handleError = async (error: unknown, consecutiveCounter: number): Promise<string> => {
    const axiosError = error as AxiosError
    if (axiosError.response?.data?.error?.code === ErrorCode.rateLimitErrorCode) {
        // It will log this specific error message if hits the rate limit
        console.log(ErrorMessage.rateLimitErrorMessage);
        console.log(`This is the ${consecutiveCounter} time you hit rate limit consecutively`);

        await exponentialBackoff(consecutiveCounter)

        return ErrorMessage.rateLimitErrorMessage
    }
    else if (axiosError.response?.data?.error?.code === ErrorCode.authErrorCode) {
        // It will log this specific error message if hits the auth error code
        console.log(ErrorMessage.authErrorMessage);
        return ErrorMessage.authErrorMessage

    }

    else {
        //It will log all other error
        console.log(ErrorMessage.otherErrorMessage)
        return ErrorMessage.otherErrorMessage
    }

};


