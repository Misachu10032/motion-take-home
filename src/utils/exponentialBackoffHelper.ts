import { waitForXSeconds } from "./awaitHelper";

export const exponentialBackoff = async ( consecutiveCounter:number):  Promise<void>  => {
    // Exponential Backoff. 
    // wait 1 min * n^2 for nth time this error is encountered consecutively
        const defaultWaitInSeconds = 60;
        const exponentialBackOffFactor = Math.pow(2, consecutiveCounter);
        const newWaitTime =defaultWaitInSeconds*exponentialBackOffFactor;
        console.log(`you are waiting for ${newWaitTime}s`);
        await waitForXSeconds(newWaitTime)
    
        





};
