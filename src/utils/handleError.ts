const rateLimitErrorCode = 17 //	Indicates that the User whose token is being used in the request has reached their rate limit.


interface AxiosError {

    message?: string;

    code?: number;


}

export const handleError = (error: unknown): void => {
    const axiosError = error as AxiosError
    if (axiosError.code === rateLimitErrorCode) {
    // It will log this specific error message if hits the rate limit
    // This is specified in the meta doc https://developers.facebook.com/docs/graph-api/overview/rate-limiting/
        console.log('You have hit the rate limit');
    }
    else if (axiosError.message) {
    // It will log any other axios related error like token invalid etc
        console.log(axiosError.message)
    } else {
    //It will log all other error
        console.log(error)
    }



};


