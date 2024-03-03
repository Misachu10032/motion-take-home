"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const rateLimitErrorCode = 17; //	Indicates that the User whose token is being used in the request has reached their rate limit.
const handleError = (error) => {
    const axiosError = error;
    if (axiosError.code === rateLimitErrorCode) {
        // It will log this specific error message if hits the rate limit
        // This is specified in the meta doc https://developers.facebook.com/docs/graph-api/overview/rate-limiting/
        console.log('You have hit the rate limit');
    }
    else if (axiosError.message) {
        // It will log any other axios related error like token invalid etc
        console.log(axiosError.message);
    }
    else {
        //It will log all other error
        console.log(error);
    }
};
exports.handleError = handleError;
