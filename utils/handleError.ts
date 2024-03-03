const rateLimitErrorCode = 17 //	Indicates that the User whose token is being used in the request has reached their rate limit.


interface AxiosError {

    message?: string;

    code?: number;


}

export const handleError = (error: unknown): void => {
    const axiosError = error as AxiosError
    if (axiosError.code === rateLimitErrorCode) {
        console.log('You have hit the rate limit');
    }
    else if (axiosError.message) {
        console.log(axiosError.message)
    } else {
        console.log(error)
    }



};


