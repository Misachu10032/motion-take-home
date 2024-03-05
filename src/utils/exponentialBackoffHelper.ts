import { waitForXSeconds } from "./awaitHelper";

export const exponentialBackoff = async ( consecutiveCounter:number):  Promise<void>  => {
    // Exponential Backoff. 
    // wait 1 min * n^2 for nth time this error is encountered consecutively
        const defaultWaitInSeconds = 5;
        const exponentialBackOffFactor = Math.pow(2, consecutiveCounter);
        await waitForXSeconds(defaultWaitInSeconds*exponentialBackOffFactor)
        





};
